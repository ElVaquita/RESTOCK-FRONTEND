"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Lomo saltado",
    price: 15,
    stock: 10,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 2,
    name: "Ceviche",
    price: 12,
    stock: 5,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 3,
    name: "Arroz con pollo",
    price: 10,
    stock: 8,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 4,
    name: "Tallarines rojos",
    price: 8,
    stock: 3,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 5,
    name: "Chaufa de pollo",
    price: 9,
    stock: 6,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 6,
    name: "Causa rellena",
    price: 7,
    stock: 4,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 7,
    name: "Arroz chaufa",
    price: 8,
    stock: 5,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 8,
    name: "Papa a la huancaína",
    price: 6,
    stock: 2,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 9,
    name: "Pollo a la brasa",
    price: 10,
    stock: 7,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
  {
    id: 10,
    name: "Chicharrón de cerdo",
    price: 9,
    stock: 4,
    image: "https://images.unsplash.com/photo-1606780840483-4b3b3e3b3b3b",
  },
];

const OrderPage: React.FC = () => {
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

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white flex">
      <div className="w-2/3 pr-8">
        <h1 className="text-2xl mb-8">Mesa {name}</h1>
        <div className="mb-4">
          <input
            type="text"
            className="p-2 w-full rounded-lg bg-gray-700"
            placeholder="Buscar producto"
          />
        </div>
        <div className="flex space-x-4 mb-8">
          <button className="px-4 py-2 bg-red-600 rounded-lg">
            Platos de fondo
          </button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg">Entradas</button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg">
            Bebestibles
          </button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg">
            Menú niños
          </button>
          <button className="px-4 py-2 bg-gray-700 rounded-lg">Postres</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-700 p-4 rounded-lg cursor-pointer"
              onClick={() => addToOrder(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg">{product.name}</h2>
              <p className="text-sm text-gray-400">
                ${product.price.toLocaleString()}
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
                  ${item.product.price.toLocaleString()}
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
                <button
                  onClick={() => removeFromOrder(index)}
                  className="text-red-500"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <p className="flex justify-between">
            <span>Monto</span>
            <span>${totalAmount.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span>Propina (10%)</span>
            <span>${tip.toFixed(2)}</span>
          </p>
          <p className="flex justify-between font-bold text-xl mt-4">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
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
