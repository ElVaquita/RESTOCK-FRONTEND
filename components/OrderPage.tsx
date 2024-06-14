"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';
import Search from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import SidebarWaiter from "./SideBarWaiter";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Tabla variedades de jamón y queso",
    price: 8990,
    stock: 10,
    category: "Platos de fondo",
    image: "/images/Entradas/1.jpg",
  },
  {
    id: 36,
    name: "Pasta con pesto y pollo ",
    price: 10990,
    stock: 10,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/10.jpg",
  },
  {
    id: 4,
    name: "Queso de cabra con tomate y albahaca",
    price: 8990,
    stock: 15,
    category: "Entradas",
    image: "/images/Entradas/4.jpg",
  },
  {
    id: 5,
    name: "Mix papas fritas, nuggets y aros de cebolla",
    price: 8990,
    stock: 3,
    category: "Entradas",
    image: "/images/Entradas/5.jpg",
  },
  {
    id: 6,
    name: "Empanada variedades",
    price: 3990,
    stock: 7,
    category: "Entradas",
    image: "/images/Entradas/6.jpg",
  },
  {
    id: 14,
    name: "Agua embotellada",
    price: 3500,
    stock: 5,
    category: "Bebestibles",
    image: "/images/Bebestibles/6.jpg",
  },
  {
    id: 7,
    name: "Canapes de ricota y jamón",
    price: 7990,
    stock: 10,
    category: "Entradas",
    image: "/images/Entradas/7.jpg",
  },
  {
    id: 8,
    name: "Porción de ostras",
    price: 9990,
    stock: 4,
    category: "Entradas",
    image: "/images/Entradas/8.jpg",
  },
  {
    id: 9,
    name: "Bebidas 591ml",
    price: 3500,
    stock: 6,
    category: "Bebestibles",
    image: "/images/Bebestibles/1.jpg",
  },
  {
    id: 11,
    name: "Limonada",
    price: 4000,
    stock: 10,
    category: "Bebestibles",
    image: "/images/Bebestibles/3.jpg",
  },
  {
    id: 12,
    name: "Cervezas artesanales",
    price: 4500,
    stock: 8,
    category: "Bebestibles",
    image: "/images/Bebestibles/4.jpg",
  },
  {
    id: 15,
    name: "Café de especialidad",
    price: 3500,
    stock: 8,
    category: "Bebestibles",
    image: "/images/Bebestibles/7.jpg",
  },
  {
    id: 25,
    name: "Waffles con syrup",
    price: 3990,
    stock: 10,
    category: "Postres",
    image: "/images/Postres/5.jpg",
  },
  {
    id: 16,
    name: "Nuggets",
    price: 5990,
    stock: 15,
    category: "Menú niños",
    image: "/images/MenuNiños/1.jpg",
  },
  {
    id: 18,
    name: "Porción de papas fritas",
    price: 3500,
    stock: 7,
    category: "Menú niños",
    image: "/images/MenuNiños/3.jpg",
  },
  {
    id: 19,
    name: "Alitas de pollo",
    price: 5990,
    stock: 10,
    category: "Menú niños",
    image: "/images/MenuNiños/4.jpg",
  },
  {
    id: 39,
    name: "Pizza mar y tierra",
    price: 12990,
    stock: 3,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/13.jpg",
  },
  {
    id: 20,
    name: "Porción empanadas de queso",
    price: 4990,
    stock: 4,
    category: "Menú niños",
    image: "/images/MenuNiños/5.jpg",
  },
  {
    id: 21,
    name: "Brownie con helado",
    price: 3990,
    stock: 6,
    category: "Postres",
    image: "/images/Postres/1.jpg",
  },
  {
    id: 3,
    name: "Dedos de queso",
    price: 7990,
    stock: 8,
    category: "Entradas",
    image: "/images/Entradas/3.jpg",
  },
  {
    id: 22,
    name: "Torta de queso",
    price: 2990,
    stock: 20,
    category: "Postres",
    image: "/images/Postres/2.jpg",
  },
  {
    id: 23,
    name: "Tiramisú",
    price: 3990,
    stock: 10,
    category: "Postres",
    image: "/images/Postres/3.jpg",
  },
  {
    id: 24,
    name: "Pie de limón",
    price: 4500,
    stock: 8,
    category: "Postres",
    image: "/images/Postres/4.jpg",
  },
  {
    id: 2,
    name: "Salame con tostadas",
    price: 5990,
    stock: 5,
    category: "Platos de fondo",
    image: "/images/Entradas/2.jpg",
  },
  {
    id: 26,
    name: "Porción de galletas",
    price: 2990,
    stock: 5,
    category: "Postres",
    image: "/images/Postres/6.jpg",
  },
  {
    id: 13,
    name: "Copa de vino",
    price: 4000,
    stock: 10,
    category: "Bebestibles",
    image: "/images/Bebestibles/5.jpg",
  },
  {
    id: 27,
    name: "Filete de pollo con ensalada",
    price: 8990,
    stock: 8,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/1.jpg",
  },
  {
    id: 28,
    name: "Pechuga de pollo con brocoli",
    price: 6990,
    stock: 15,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/2.jpg",
  },
  {
    id: 30,
    name: "Puré con pechuga de pollo",
    price: 9990,
    stock: 7,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/4.jpg",
  },
  {
    id: 31,
    name: "Cordero con reducción de zapallo",
    price: 11990,
    stock: 10,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/5.jpg",
  },
  {
    id: 32,
    name: "Filete de vacuno con mix de tomates asados",
    price: 11990,
    stock: 8,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/6.jpg",
  },
  {
    id: 34,
    name: "Laminas de pescado con papas",
    price: 10990,
    stock: 3,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/8.jpg",
  },
  {
    id: 17,
    name: "Filetes de pollo",
    price: 6990,
    stock: 3,
    category: "Menú niños",
    image: "/images/MenuNiños/2.jpg",
  },
  {
    id: 35,
    name: "Pasta con camarones",
    price: 11990,
    stock: 7,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/9.jpg",
  },
  {
    id: 37,
    name: "Raviolis de cerdo con salsa de tomate",
    price: 11990,
    stock: 8,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/11.jpg",
  },
  {
    id: 38,
    name: "Pasta con salsa de tomates",
    price: 7990,
    stock: 15,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/12.jpg",
  },
  {
    id: 10,
    name: "Jugos naturales 500ml",
    price: 4000,
    stock: 20,
    category: "Bebestibles",
    image: "/images/Bebestibles/2.jpg",
  },
  {
    id: 40,
    name: "Fajitas de pollo",
    price: 5990,
    stock: 7,
    category: "Platos de fondo",
    image: "/images/PlatosFondo/14.jpg",
  },
];

const OrderPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (product.category === selectedCategory || selectedCategory === '')
  );

  const params = useParams();
  const name = params.name; // Obtener el nombre de la mesa desde la URL dinámica
  const [orderItems, setOrderItems] = useState<
    { product: Product; quantity: number; note: string }[]
  >([]);

  const addToOrder = (product: Product) => {
    setOrderItems([...orderItems, { product, quantity: 1, note: "" }]);
  };

  const removeFromOrder = (index: number) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const updateQuantity = (index: number, quantity: number) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index].quantity = quantity;
    setOrderItems(newOrderItems);
  };

  const updateNote = (index: number, note: string) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index].note = note;
    setOrderItems(newOrderItems);
  };

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const tip = totalAmount * 0.1;
  const finalTotal = totalAmount + tip;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? '' : category);
  };
//TODO: Implemetar habilitacion de boton para emitir pago
//TODO: Implementar añadir productos a mesa ocupada

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer"
              onClick={() => addToOrder(product)}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg">{product.name}</h2>
              <p className="text-sm text-gray-400">
                ${product.price.toLocaleString("es-CL")}
              </p>
              <p className="text-sm text-gray-400">
                {product.stock} platos en stock
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 bg-gray-900 p-8 rounded-lg">
        <h2 className="text-xl mb-4">Orden #{name}</h2>
        <ul className="space-y-4">
          {orderItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <h3>{item.product.name}</h3>
                <p className="text-gray-400">
                  ${item.product.price.toLocaleString("es-CL")}
                </p>
                <input
                  type="text"
                  placeholder="Nota del pedido"
                  className="mt-2 p-2 bg-gray-800 rounded-lg w-full"
                  value={item.note}
                  onChange={(e) => updateNote(index, e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  className="p-2 w-16 bg-gray-800 rounded-lg text-center mr-2"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(index, parseInt(e.target.value))
                  }
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
        </div>
        <button className="mt-8 w-full bg-red-600 py-3 rounded-lg">
          Confirmar orden
        </button>
      </div>
    </div>
  );
};

export default OrderPage;