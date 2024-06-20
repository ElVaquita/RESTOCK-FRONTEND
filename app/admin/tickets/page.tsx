"use client";
import React, { useEffect, useState } from "react";
import SidebarAdmin from "@/components/SideBarAdmin";
import { Sale } from "@/types/Products";
import Cookies from 'js-cookie';
import { getAllSalesBack } from "@/services/order.service";
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';

const SalesManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newFormatDate, setNewFormatDate] = useState<string>('');

  // OBTENER TODAS LAS VENTAS
  const fetchSales = async () => {
    try{
      const accessToken = Cookies.get('accessToken');
      const response = await getAllSalesBack(accessToken);
      if(response.sales){
        setSales(response.sales);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // CARGAR LAS VENTAS AL INGRESAR A LA PAGINA
  useEffect(() => {
    fetchSales();
  }, [])

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setNewFormatDate(formatDate(event.target.value));
  };

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
  };

  const handleCloseDetails = () => {
    setSelectedSale(null);
  };

  // FILTRO DE FECHA Y NOMBRE
  const filteredSales = sales.filter((sale) =>
    (searchTerm === '' || sale.userName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    ((newFormatDate === '' || sale.date === newFormatDate))
  );

  const formatDate = (date:string) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex bg-gray-800 text-white min-h-screen">
      <SidebarAdmin />
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-8">Gestión de Ventas</h1>
        <div className="h-1 bg-red-600 mb-4"></div>
        <div className="mb-6 flex items-center space-x-4">
          <SearchIcon className='text-white' />
          <input
            type = "text"
            placeholder="Buscar por garzón..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg bg-gray-700"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        { sales && sales.length > 0 ? (
          filteredSales.length === 0 ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
              <SearchOffIcon style={{ fontSize: 60, marginBottom: 16 }} />
              <p className="text-xl">No se encontraron productos</p>
            </Box>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredSales?.map(sale => (
                <div key={sale.id} className="bg-gray-700 p-4 rounded-lg shadow-lg flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Venta #{sale.id}</h3>
                    <p><span className="font-semibold">Garzón:</span> {sale.userName}</p>
                    <p><span className="font-semibold">Mesa:</span> {sale.tableName}</p>
                    <p><span className="font-semibold">Fecha:</span> {sale.date}</p>
                    <p><span className="font-semibold">Propina:</span> ${sale.tip.toLocaleString("es-CL")}</p>
                    <p><span className="font-semibold">Total:</span> ${sale.totalPrice.toLocaleString("es-CL")}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(sale)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Ver detalles
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center mt-20">
            <SearchOffIcon style={{ fontSize: 80 }} className="mb-4" />
            <p className="text-xl">No se encontraron productos</p>
          </div> 
        )}  
      </div>
      {selectedSale && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-2/3 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Detalles de la Venta #{selectedSale.id}</h3>
            <p><span className="font-semibold">Garzón:</span> {selectedSale.userName}</p>
            <p><span className="font-semibold">Mesa:</span> {selectedSale.tableName}</p>
            <p><span className="font-semibold">Fecha:</span> {selectedSale.date}</p>
            <p><span className="font-semibold">Propina:</span> ${selectedSale.tip.toLocaleString("es-CL")}</p>
            <p><span className="font-semibold">Total:</span> ${selectedSale.totalPrice.toLocaleString("es-CL")}</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Productos:</h4>
              <ul className="list-disc list-inside">
                {selectedSale.products.map(product => (
                  <li key={product.productId} className="mb-2">
                    <p>{product.productName} (x{product.quantity})</p>
                    <p>Modificaciones: {product.modifications}</p>
                    <p>Precio Unitario: ${product.pricePerUnit.toLocaleString("es-CL")}</p>
                    <p>Precio Total: ${product.totalPrice.toLocaleString("es-CL")}</p>
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
