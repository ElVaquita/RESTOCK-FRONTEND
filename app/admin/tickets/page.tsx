"use client";
import React, { useState } from "react";
import SidebarAdmin from "@/components/SideBarAdmin";

type OrderItem = {
  productId: number;
  quantity: number;
  modifications: string;
  productName: string;
  pricePerUnit: number;
  totalPrice: number;
};

type Sale = {
  id: number;
  userName: string;
  tableName: string;
  date: string;
  tip: number;
  totalPrice: number;
  products: OrderItem[];
};

const sales: Sale[] = [
  {
    id: 1,
    userName: "Juan Pérez",
    tableName: "Mesa 1",
    date: "2024-06-10",
    tip: 1000,
    totalPrice: 20990,
    products: [
      {
        productId: 1,
        quantity: 2,
        modifications: "Sin cebolla",
        productName: "Tabla variedades de jamón y queso",
        pricePerUnit: 8990,
        totalPrice: 17980,
      },
      {
        productId: 9,
        quantity: 1,
        modifications: "",
        productName: "Bebidas 591ml",
        pricePerUnit: 3500,
        totalPrice: 3500,
      },
    ],
  },
  {
    id: 2,
    userName: "María López",
    tableName: "Mesa 3",
    date: "2024-06-12",
    tip: 2000,
    totalPrice: 25980,
    products: [
      {
        productId: 14,
        quantity: 1,
        modifications: "Con hielo",
        productName: "Agua embotellada",
        pricePerUnit: 3500,
        totalPrice: 3500,
      },
      {
        productId: 25,
        quantity: 2,
        modifications: "Extra syrup",
        productName: "Waffles con syrup",
        pricePerUnit: 3990,
        totalPrice: 7980,
      },
      {
        productId: 35,
        quantity: 1,
        modifications: "Sin camarones",
        productName: "Pasta con camarones",
        pricePerUnit: 11990,
        totalPrice: 11990,
      },
    ],
  },
  {
    id: 3,
    userName: "Carlos Sánchez",
    tableName: "Mesa 5",
    date: "2024-06-15",
    tip: 1500,
    totalPrice: 16480,
    products: [
      {
        productId: 16,
        quantity: 1,
        modifications: "Sin salsa",
        productName: "Nuggets",
        pricePerUnit: 5990,
        totalPrice: 5990,
      },
      {
        productId: 10,
        quantity: 2,
        modifications: "Sin azúcar",
        productName: "Jugos naturales 500ml",
        pricePerUnit: 4000,
        totalPrice: 8000,
      },
      {
        productId: 24,
        quantity: 1,
        modifications: "Extra limón",
        productName: "Pie de limón",
        pricePerUnit: 4500,
        totalPrice: 4500,
      },
    ],
  },
  {
    id: 4,
    userName: "Ana González",
    tableName: "Mesa 2",
    date: "2024-06-14",
    tip: 1800,
    totalPrice: 21980,
    products: [
      {
        productId: 21,
        quantity: 1,
        modifications: "",
        productName: "Brownie con helado",
        pricePerUnit: 3990,
        totalPrice: 3990,
      },
      {
        productId: 30,
        quantity: 1,
        modifications: "",
        productName: "Puré con pechuga de pollo",
        pricePerUnit: 9990,
        totalPrice: 9990,
      },
      {
        productId: 13,
        quantity: 1,
        modifications: "",
        productName: "Copa de vino",
        pricePerUnit: 4000,
        totalPrice: 4000,
      },
      {
        productId: 17,
        quantity: 1,
        modifications: "",
        productName: "Filetes de pollo",
        pricePerUnit: 6990,
        totalPrice: 6990,
      },
    ],
  },
  {
    id: 5,
    userName: "Luis Ramírez",
    tableName: "Mesa 4",
    date: "2024-06-13",
    tip: 1200,
    totalPrice: 14980,
    products: [
      {
        productId: 22,
        quantity: 2,
        modifications: "",
        productName: "Torta de queso",
        pricePerUnit: 2990,
        totalPrice: 5980,
      },
      {
        productId: 27,
        quantity: 1,
        modifications: "",
        productName: "Filete de pollo con ensalada",
        pricePerUnit: 8990,
        totalPrice: 8990,
      },
    ],
  },
];

const SalesManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserName(event.target.value);
  };

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
  };

  const handleCloseDetails = () => {
    setSelectedSale(null);
  };

  const filteredSales = sales.filter((sale) =>
    (selectedDate === '' || sale.date === selectedDate) &&
    (selectedUserName === '' || sale.userName === selectedUserName)
  );

  const uniqueUserNames = Array.from(new Set(sales.map(sale => sale.userName)));

  return (
    <div className="flex bg-gray-800 text-white min-h-screen">
      <SidebarAdmin />
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-8">Gestión de Ventas</h1>
        <div className="h-1 bg-red-600 mb-4"></div>
        <div className="mb-6 flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedUserName}
            onChange={handleUserNameChange}
            className="p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los garzones</option>
            {uniqueUserNames.map(userName => (
              <option key={userName} value={userName}>
                {userName}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {filteredSales.map(sale => (
            <div key={sale.id} className="bg-gray-700 p-4 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold mb-2">Venta #{sale.id}</h3>
                <p><span className="font-semibold">Garzón:</span> {sale.userName}</p>
                <p><span className="font-semibold">Mesa:</span> {sale.tableName}</p>
                <p><span className="font-semibold">Fecha:</span> {sale.date}</p>
                <p><span className="font-semibold">Propina:</span> ${sale.tip}</p>
                <p><span className="font-semibold">Total:</span> ${sale.totalPrice}</p>
              </div>
              <button
                onClick={() => handleViewDetails(sale)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedSale && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-2/3 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Detalles de la Venta #{selectedSale.id}</h3>
            <p><span className="font-semibold">Garzón:</span> {selectedSale.userName}</p>
            <p><span className="font-semibold">Mesa:</span> {selectedSale.tableName}</p>
            <p><span className="font-semibold">Fecha:</span> {selectedSale.date}</p>
            <p><span className="font-semibold">Propina:</span> ${selectedSale.tip}</p>
            <p><span className="font-semibold">Total:</span> ${selectedSale.totalPrice}</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Productos:</h4>
              <ul className="list-disc list-inside">
                {selectedSale.products.map(product => (
                  <li key={product.productId} className="mb-2">
                    <p>{product.productName} (x{product.quantity})</p>
                    <p>Modificaciones: {product.modifications}</p>
                    <p>Precio Unitario: ${product.pricePerUnit}</p>
                    <p>Precio Total: ${product.totalPrice}</p>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleCloseDetails}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagement;
