import React from "react";
import SidebarAdmin from "@/components/SideBarAdmin";
import Image from 'next/image'; 
import InventoryIcon from '@mui/icons-material/Inventory';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

const HomeAdmin = () => {
  return (
    <div className="flex bg-gray-800 text-white min-h-screen">
      <SidebarAdmin />
      <div className="w-full p-8">
        <div className="flex flex-col items-center">
          <Image src="/images/logo.png" alt="Logo del Restaurante" className="mb-4" />
          <h1 className="text-3xl font-bold mb-4">Bienvenido a la Gestión de Ventas</h1>
          <p className="text-lg mb-8">Seleccione una opción para comenzar</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <a href="/admin/inventory" className="bg-red-700 hover:bg-red-900 text-white p-4 rounded-lg flex flex-col items-center" style={{cursor: 'pointer'}}>
              <InventoryIcon fontSize='large' />
                <span className="text-xl font-bold">Inventario</span>
              </a>
              <a href="/admin/tickets" className="bg-red-700 hover:bg-red-900 text-white p-4 rounded-lg flex flex-col items-center" style={{cursor: 'pointer'}}>
              <AppRegistrationIcon fontSize='large' />
                <span className="text-xl font-bold">Ventas</span>
              </a>
              <a href="/admin/tables" className="bg-red-700 hover:bg-red-900 text-white p-4 rounded-lg flex flex-col items-center" style={{cursor: 'pointer'}}>
                <TableRestaurantIcon fontSize='large' />
                <span className="text-xl font-bold">Mesas</span>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;