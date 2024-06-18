"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from 'next/image';
import Search from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import SidebarWaiter from "./SideBarWaiter";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { getAllProductsBack, getProductByIDBack, updateProductBack } from "../services/product.service";
import { createOrderBack, createSaleBack, getOrderByIdBack, getTableByNameBack, updateOrderBack, updateTableStateBack } from "../services/order.service"
import { Order, OrderItem, Product } from "@/types/Products";
import { jwtVerify } from "jose";
import { Alert } from '@mui/material';
import { getUserBack } from "@/services/auth.service";

const OrderPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [quantityTable, setQuantityTable] = useState<number>();
  const [showDescription, setShowDescription] = useState<{ visible: boolean; description: string }>({ visible: false, description: '' });
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order>();
  const [orderID, setOrderID] = useState<number>();
  const [orderEditState, setOrderEditState] = useState(false);
  const [ limitStock, setLimitStock ] = useState(false);
  const router = useRouter();
  const params = useParams();
  const name = params.name; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await getAllProductsBack(accessToken);
        setProducts(response.products);
        const tableName = `Mesa ${name}`
        const responseTable = await getTableByNameBack(tableName, accessToken);
        if (responseTable.table.state === "Ocupada") {
          try {
            const orderId = responseTable.table.activeOrderId;
            const responseOrder = await getOrderByIdBack(orderId, accessToken);
            setOrder(responseOrder.order);
            setOrderItems(responseOrder.order.orderItems);
            setEmail(responseOrder.order.email);
            setQuantityTable(responseTable.table.quantity)
            setOrderID(orderId);
            setOrderEditState(true);
          } catch (error) {
            console.error(error);
          }
        }
      } catch(error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (product.category === selectedCategory || selectedCategory === '')
  );

  // AGREGAR PRODUCTO A NUEVA ORDEN, DISMINUIR 1 DE STOCK
  const addToOrder = async (product: Product) => {

    if( product.stock <= 0) return;

    const newOrderItem: OrderItem = {
      productId: product.id,
      quantity: 1,
      modifications: "",
      productName: product.name,
      pricePerUnit: product.price,
      totalPrice: product.price,
    };
    const originalStock = product.stock;
    product.stock = product.stock - 1;
    try {
      const accessToken = Cookies.get('accessToken');
      await updateProductBack(product.id, product, accessToken);
      setOrderItems([...orderItems, newOrderItem]);
    } catch (error) {
        console.error("Failed to update product stock:", error);
        product.stock = originalStock;
        throw new Error("Failed to add product to order");
    }
  };

  // REMOVER UN PRODUCTO DE ORDEN, VOLVER A AGREGAR STOCK
  const removeFromOrder = async (index: number) => {
    const newOrderItems = [...orderItems];
    const removedItem = newOrderItems.splice(index, 1)[0];
    try {
      const accessToken = Cookies.get('accessToken');
      const productResponse = await getProductByIDBack(removedItem.productId, accessToken);
      const product = productResponse.data;

      const originalStock = product.stock;
      product.stock = product.stock + removedItem.quantity;

      try {
        await updateProductBack(product.id, product, accessToken); 
        setOrderItems(newOrderItems);

      } catch (error) {
        console.error(error);
        product.stock = originalStock;
        newOrderItems.splice(index,0,removedItem);
        setOrderItems(newOrderItems);
      }

    } catch (error) {
      console.error(error);
    }
  };

  // AGREGAR CANTIDAD DE PRODUCTO Y DISMINUIR STOCK EN INVENTARIO
  const updateQuantity = async (index: number, quantity: number) => {
    const newOrderItems = [...orderItems];
    const item = newOrderItems[index];
    const difference = quantity - item.quantity;

    try {
      const accessToken = Cookies.get('accessToken');
      const productResponse = await getProductByIDBack(item.productId, accessToken);
      const product = productResponse.data;

      if (quantity > (item.quantity + product.stock)) {
        console.error("Stock exceded")
        setLimitStock(true);
      }

      const originalStock = product.stock;
      product.stock = product.stock - difference;

      try{
        await updateProductBack(product.id, product, accessToken); 
        item.quantity = quantity;
        setOrderItems(newOrderItems);
      }catch (error) {
        console.error(error);
        product.stock = originalStock;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = (index: number, note: string) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index].modifications = note;
    setOrderItems(newOrderItems);
  };

  const totalAmount = orderItems.reduce((total, item) => {
    item.totalPrice = item.pricePerUnit * item.quantity;
    return total + item.totalPrice;
  },0 );
  const tip = totalAmount * 0.1;
  const finalTotal = totalAmount + tip;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
  };

  const handleAccept = async () => {
    const accessToken = Cookies.get('accessToken');
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    if (accessToken) {
      try {
        const { payload } = await jwtVerify(accessToken, secret);
        if (payload && typeof payload.id === 'number') {
          const userId = payload.id;
          const tableName = `Mesa ${name}`;
          if (orderEditState) {
            try{
              const responseEditedOrder = await updateOrderBack(orderID, orderItems, userId, tableName, email, accessToken); 
              const responseTable = await getTableByNameBack(tableName, accessToken);

              const table = responseTable.table;
              table.quantity = quantityTable;
              table.state = "Ocupada";
              table.activeOrderId = responseEditedOrder.id; 

              setShowModal(false);
              setOrderEditState(false);
              router.push('/user/home-waiter');
            } catch (error) {
              console.error(error);
            }
          }
          try {
            const responseOrder = await createOrderBack(orderItems, userId, tableName, email, accessToken);
            const responseTable = await getTableByNameBack(tableName, accessToken);

            const table = responseTable.table;
            table.quantity = quantityTable;
            table.state = "Ocupada";
            table.activeOrderId = responseOrder.id; 

            await updateTableStateBack(table.id, table.quantity, table.state, table.activeOrderId, accessToken);
            setShowModal(false);
            router.push('/user/home-waiter');
          }catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleMouseEnter = (description: string) => {
    setShowDescription({ visible: true, description });
  };

  const handleMouseLeave = () => {
    setShowDescription({ visible: false, description: '' });
  };

  const handlePayment = async () => {
    const accessToken = Cookies.get('accessToken');
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    if (accessToken) {
      try {
        const { payload } = await jwtVerify(accessToken, secret);
        if (payload && typeof payload.id === 'number') {
          const userId = payload.id;
          const responseUser = await getUserBack(userId, accessToken);
          const userName = responseUser.user.name;
          const tableName = `Mesa ${name}`;
          const date = new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago' });
          
          await createSaleBack(userName, tableName , date, tip, finalTotal, orderItems, email, accessToken);
          
          const responseTable = await getTableByNameBack(tableName, accessToken);

          const table = responseTable.table;
          table.quantity = 0;
          table.state = "Disponible";
          table.activeOrderId = null; 

          await updateTableStateBack(table.id, table.quantity, table.state, table.activeOrderId, accessToken);
          setShowModal(false);
          setOrderEditState(false);
          router.push('/user/home-waiter');        
        }
      } catch (error) {
        console.error(error);
      }  
    }  
  }

  const handleSaveEmail = () => {
    setSavedEmail(email);
  };

  const handleAlertClose = () => {
    setLimitStock(false);
  };

  return (
    <div className="flex bg-gray-800 text-white">
      <SidebarWaiter /> 
      <div className="w-2/3 p-8">
        <div className="flex items-center mb-0">
          <h1 className="text-2xl mb-9">Mesa {name}</h1>
          <div className="ml-auto mb-9">
            <Search className="text-white mr-2" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-lg bg-gray-700"
            />
          </div>
        </div>
        
        <div className="h-1 bg-red-600 mb-4"></div> 
        <div className="flex space-x-4 mb-8">
          <button 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'Platos de fondo' ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => handleCategoryClick('Platos de fondo')}
          > 
            Platos de fondo
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'Entradas' ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => handleCategoryClick('Entradas')}
          >
            Entradas
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'Bebestibles' ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => handleCategoryClick('Bebestibles')}
          >
            Bebestibles
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'Menú niños' ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => handleCategoryClick('Menú niños')}
          >
            Menú niños
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${selectedCategory === 'Postres' ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => handleCategoryClick('Postres')}
          >
            Postres
          </button>
        </div>
        <p className="text-xl mb-8">Selecciona los productos...</p>
        {(filteredProducts.length === 0 || products.length === 0 )? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
            <SearchOffIcon style={{ fontSize: 60, marginBottom: 16 }} />
            <p className="text-xl">No se encontraron productos</p>
          </Box>
        ): (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Tooltip 
                title={
                  <React.Fragment>
                    <Typography color="inherit" variant="subtitle2" >Descripción</Typography>
                    <Typography color="inherit" variant="caption" >{product.description || ''}</Typography>
                  </React.Fragment>
                } 
                arrow key={product.id}
              >
                <div
                  className={`bg-gray-700 p-4 rounded-lg cursor-pointer ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => product.stock > 0 && addToOrder(product)}
                  onMouseEnter={() => handleMouseEnter(product.description || '')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={product.image || ""}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h2 className="text-lg">{product.name}</h2>
                  <p className="text-sm text-gray-400">
                    ${product.price.toLocaleString("es-CL")}
                  </p>
                  <p className={`text-sm ${product.stock > 0 ? 'text-gray-400' : 'text-red-500'}`}>
                    {product.stock > 0 ? `${product.stock} platos en stock` : 'Sin stock'}
                  </p>
                </div>
              </Tooltip>
            ))}
          </div>
        )}  
        </div>
      
      <div className="w-1/3 bg-gray-900 p-8 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Orden #{name}</h2>
          <button 
            className={`text-white py-2 px-4 rounded-lg ${orderItems.length > 0 ? 'bg-red-600 hover:bg-red-800' : 'bg-gray-600 cursor-not-allowed'} `}
            disabled={orderItems.length === 0}
            onClick={handlePayment}
          >
            Emitir pago
          </button>
        </div>
        <div className="h-1 bg-red-600 mb-8 mt-9"></div> 
        <ul className="space-y-4">
          {orderItems.map((item, index) => (
            <li key={index} className="flex flex-col mb-4">
              <h3>{item.productName}</h3>
              <p className="text-gray-400">
                ${item.pricePerUnit.toLocaleString("es-CL")}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <input
                  type="text"
                  placeholder="Nota del pedido"
                  className="p-2 bg-gray-800 rounded-lg flex-grow"
                  value={item.modifications}
                  onChange={(e) => updateNote(index, e.target.value)}
                />
                <input
                  type="number"
                  className="p-2 bg-gray-800 rounded-lg text-center w-16"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (newQuantity <= item.quantity + (products.find(p => p.id === item.productId)?.stock || 0)) {
                      updateQuantity(index, newQuantity);
                    }
                  }}
                  max={item.quantity + (products.find(p => p.id === item.productId)?.stock || 0)}
                />
                <button onClick={() => removeFromOrder(index)} className="text-red-500">
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <p className="flex justify-between">
            <span>Monto</span>
            <span>${totalAmount.toLocaleString("es-CL")}</span>
          </p>
          <p className="flex justify-between">
            <span>Propina (10%)</span>
            <span>${tip.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          </p>
          <p className="flex justify-between font-bold text-xl mt-4">
            <span>Total</span>
            <span>${finalTotal.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          </p>
          <div className="flex mt-4 ">
            <input
              type= "email"
              placeholder="Correo electrónico"
              className="p-2 bg-gray-800 rounded-lg flex-grow w-16"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IconButton              
              onClick={handleSaveEmail}
            >
              <SaveIcon sx= {{ color: "white" }}/>
            </IconButton>
          </div>
          {savedEmail && (
            <p className="mt-4 text-green-500">
              Correo {savedEmail} guardado con exito
            </p>
          )}
          <div className="flex mt-4 ">
            <input
              type= "number"
              placeholder="Cantidad de personas"
              className="p-2 bg-gray-800 rounded-lg flex-grow w-16"
              value={quantityTable}
              onChange={(e) => setQuantityTable(parseInt(e.target.value))}
            />
          </div>
        </div>
        <button
          className={`mt-8 w-full py-3 rounded-lg ${orderItems.length > 0 ? 'bg-red-600 hover:bg-red-800' : 'bg-gray-600 cursor-not-allowed'}`}
          disabled={orderItems.length === 0}
          onClick={() => setShowModal(true)}
        >
          Confirmar orden
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-400 p-8 rounded-lg text-black">
            <p>Su orden fue enviada a cocina correctamente!</p>
            <div className="flex justify-center items-center h-full w-full">
              <button
                className="mt-8 py-2 px-8 bg-red-600 text-white rounded-lg"
                onClick={handleAccept}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
      {limitStock && (
        <div className="absolute top-0 left-0 w-full z-50">
          <Alert severity="error" onClose={handleAlertClose} sx={{ textAlign: 'center' }}>
            No hay mas stock disponible para ese producto
          </Alert>
        </div>
      )}
    </div>
  );
};

export default OrderPage;