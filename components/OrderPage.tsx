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
import * as Yup from 'yup';
import { orderSchema } from '../validation/order-schema';

const OrderPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [quantityTable, setQuantityTable] = useState<number>(0);
  const [showDescription, setShowDescription] = useState<{ visible: boolean; description: string }>({ visible: false, description: '' });
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order>();
  const [orderID, setOrderID] = useState<number>();
  const [tip, setTip] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [orderEditState, setOrderEditState] = useState(false);
  const [ limitStock, setLimitStock ] = useState(false);
  const validationSchema = orderSchema;
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const params = useParams();
  const name = params.name; 
  const [IsLoadingPurchase, setIsLoadingPurchase] = useState(false);
  const [errorOnPurchase, setErrorOnPurchase] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await getAllProductsBack(accessToken);
        if(response.products){
          setProducts(response.products);
        }
        const tableName = `Mesa ${name}`
        const responseTable = await getTableByNameBack(tableName, accessToken);
        if (responseTable.table.state === "Ocupada") {
          try {
            const orderId = responseTable.table.activeOrderId;
            const responseOrder = await getOrderByIdBack(orderId, accessToken);
            setTotalAmount(responseOrder.order.totalPrice);
            setTip(responseOrder.order.totalPrice * 0.1);

            const total = responseOrder.order.totalPrice + responseOrder.order.totalPrice * 0.1;
            setFinalTotal(total);

            setOrderItems(responseOrder.order.items);
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
  }, [name])

  useEffect(() => {
    updateProductStockInFrontend();
    getTotalAmount();
  }, [orderItems]);

  useEffect(() => {
    setTimeout(() => {
      setLimitStock(false); 
      setErrorOnPurchase(false); 
    }, 10000);  

  }, [limitStock]);

  const updateProductStockInFrontend = async () => {
    const updatedProducts = [...products];
    setProducts(updatedProducts);
  };

  // CALCULOS DE LA ORDEN
  const getTotalAmount = () => {
    if(orderItems && orderItems.length !== 0) {
      const totalAmountCalculation = orderItems.reduce((total, item) => {
        item.totalPrice = item.pricePerUnit * item.quantity;
        return total + item.totalPrice;
      }, 0);
  
      setTotalAmount(totalAmountCalculation);
      setTip(totalAmountCalculation * 0.1); 
      setFinalTotal(totalAmountCalculation + (totalAmountCalculation * 0.1)); 
    }
    else {
      setTotalAmount(0);
      setTip(0); 
      setFinalTotal(0); 
    } 
  };


  // AGREGAR PRODUCTO A NUEVA ORDEN, DISMINUIR 1 DE STOCK
  const addToOrder = (product: Product) => {

    if( product.stock === 0){
      setLimitStock(true);
      return;
    } 

    const existingItemIndex = orderItems.findIndex(item => item.productId === product.id);
    const existingItem = orderItems[existingItemIndex];

    const newProducts = [...products];

    const productIndex = newProducts.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      newProducts[productIndex].stock -= 1;
    }

    if (existingItem) {
      const newOrderItems = [...orderItems];
      newOrderItems[existingItemIndex].quantity += 1;
      setOrderItems(newOrderItems);
    } else {
      const newOrderItem: OrderItem = {
        productId: product.id,
        quantity: 1,
        modifications: "",
        productName: product.name,
        pricePerUnit: product.price,
        totalPrice: product.price,
      };
      setOrderItems([...orderItems, newOrderItem]);
    }
    setProducts(newProducts);
  };

  // AGREGAR O QUITAR CANTIDAD DE PRODUCTO Y CAMBIAR STOCK EN INVENTARIO
  const updateQuantity = (index: number, quantity: number) => {

    const newOrderItems = [...orderItems];
    const itemOrder = newOrderItems[index];

    const newProductsItems = [...products];
    const itemProduct = products.find(product => product.id === itemOrder.productId);

    if ( itemProduct && (quantity > itemProduct.stock) || quantity < 0) {
      setLimitStock(true);
      return;
    }

    const difference = quantity - itemOrder.quantity;
    if (itemProduct && itemProduct.stock >= difference) {
      const productIndex = newProductsItems.findIndex(p => p.id === itemOrder.productId);
      if (productIndex !== -1) {
        newProductsItems[productIndex].stock -= difference;
      }
      itemOrder.quantity = quantity;
      setOrderItems(newOrderItems);
      setProducts(newProductsItems);
    }
    else {
      setLimitStock(true);
      return;
    }
  };

  // REMOVER UN PRODUCTO DE ORDEN, VOLVER A AGREGAR STOCK
  const removeFromOrder = (index: number) => {
    const newOrderItems = [...orderItems];
    const removedItem = newOrderItems.splice(index, 1)[0];

    const newProducts = [...products];
    const productIndex = newProducts.findIndex(p => p.id === removedItem.productId);
    if (productIndex !== -1) {
      newProducts[productIndex].stock += removedItem.quantity;
    }

    setOrderItems(newOrderItems);
    setProducts(newProducts);
  };



  // AGREGAR NOTA AL ORDERITEM
  const updateNote = (index: number, note: string) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index].modifications = note;
    setOrderItems(newOrderItems);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
  };

  const handleConfirm = async () => {
    try {
      await validationSchema.validate({ quantityTable, email }, { abortEarly: false });
      setShowModal(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach(err => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      }  else {
        console.error(error);
      }
    }

  }

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

              await updateTableStateBack(table.id, table.quantity, table.state, table.activeOrderId, accessToken);

              for (const product of products) {
                await updateProductBack(product.id, product, accessToken);
              }

              setShowModal(false);
              setOrderEditState(false);
              router.push('/user/home-waiter');
              setErrors({});
            } catch (error) {
              console.error(error);
            }
          }
          else {
            try {
              const responseOrder = await createOrderBack(orderItems, userId, tableName, email, accessToken);
              const responseTable = await getTableByNameBack(tableName, accessToken);

              const table = responseTable.table;
              table.quantity = quantityTable;
              table.state = "Ocupada";
              table.activeOrderId = responseOrder.id; 

              await updateTableStateBack(table.id, table.quantity, table.state, table.activeOrderId, accessToken);

              for (const product of products) {
                await updateProductBack(product.id, product, accessToken);
              }

              setShowModal(false);
              router.push('/user/home-waiter');
              setErrors({});
            }catch (error) {
              console.error(error);
            }
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


  // PAGO Y ENVIO DE COMPROBANTE
  const handlePayment = async () => {
    const accessToken = Cookies.get('accessToken');
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    if (accessToken) {
      try {
        await validationSchema.validate({ quantityTable, email }, { abortEarly: false });
        setIsLoadingPurchase(true);
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
          setTimeout(() => {
            router.push('/user/home-waiter');    
            setIsLoadingPurchase(false);
          }, 4000);    
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {};
          error.inner.forEach(err => {
            if (err.path) {
              validationErrors[err.path] = err.message;
            }
          });
          setErrors(validationErrors);
        }  else {
          console.error(error);
          setErrorOnPurchase(true);
          setIsLoadingPurchase(false);
        }
      }  
    }  
  }

  const handleSaveEmail = () => {
    setSavedEmail(email);
  };

  const handleAlertClose = () => {
    setLimitStock(false);
    setIsLoadingPurchase(false);
  };

  // FILTRO POR CATEGORIA
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (product.category === selectedCategory || selectedCategory === '')
  );

  // LIMPIAR ERRORES AL COLOCAR EL MOUSE 
  const clearError = (field: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="flex bg-gray-800 text-white">
      <SidebarWaiter /> 
      <div className="w-2/3 p-8">
        <div className="flex items-center mb-0">
          <h1 className="text-2xl mb-9">
            {orderEditState ? `Mesa ${name} - Editando orden` : `Mesa ${name} - Creando orden`}
          </h1>
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
            {filteredProducts?.map((product) => (
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
            className={`text-white py-2 px-4 rounded-lg ${orderItems && orderItems.length > 0 ? 'bg-red-600 hover:bg-red-800' : 'bg-gray-600 cursor-not-allowed'} `}
            disabled={orderItems && orderItems.length === 0}
            onClick={handlePayment}
          >
            Emitir pago
          </button>
        </div>
        <div className="h-1 bg-red-600 mb-8 mt-9"></div> 
        <ul className="space-y-4">
          {orderItems?.map((item, index) => (
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
                <button 
                  onClick={() => removeFromOrder(index)} 
                  className="text-red-500"
                >
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
              onFocus={() => {
                clearError('email');
              }}
            />
            <IconButton              
              onClick={handleSaveEmail}
            >
              <SaveIcon sx= {{ color: "white" }}/>
            </IconButton>
          </div>
          {errors.email && <span className="block text-red-500 text-sm">{errors.email}</span>}
          {savedEmail && (
            <p className="mt-4 text-green-500">
              Correo {savedEmail} guardado con exito
            </p>
          )}
          <div className="flex mt-4 ">
            <p className="flex-grow mt-4">
              Cantidad de comensales (max. 6)
            </p>
            <input
              type= "number"
              placeholder="0"
              className="p-2 bg-gray-800 rounded-lg flex-grow w-16"
              value={quantityTable}
              onChange={(e) => setQuantityTable(parseInt(e.target.value))}
              onFocus={() => {
                clearError('quantityTable');
              }}
            />
          </div>
          {errors.quantityTable && <span className="block text-red-500 text-sm">{errors.quantityTable}</span>}
        </div>
        <button
          className={`mt-8 w-full py-3 rounded-lg ${orderItems && orderItems.length > 0 ? 'bg-red-600 hover:bg-red-800' : 'bg-gray-600 cursor-not-allowed'}`}
          disabled={orderItems && orderItems.length === 0}
          onClick={handleConfirm}
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
            No puede realizar esa accion
          </Alert>
        </div>
      )}
      {IsLoadingPurchase && (
        <div className="absolute top-0 left-0 w-full z-50">
          <Alert severity="success" onClose={handleAlertClose} sx={{ textAlign: 'center' }}>
            Se esta enviando el comprobante a {email}
          </Alert>
        </div>
      )}
      {errorOnPurchase && (
        <div className="absolute top-0 left-0 w-full z-50">
          <Alert severity="error" onClose={handleAlertClose} sx={{ textAlign: 'center' }}>
            Ocurrio un error al intentar enviar el comprobante
          </Alert>
        </div>
      )}
    </div>
  );
};

export default OrderPage;