import React from "react";
import SidebarAdmin from "@/components/SideBarAdmin";

const HomeAdmin = () => {
  return (
    <div className="flex bg-gray-800 text-white min-h-screen">
      <SidebarAdmin />
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold mb-8">Gestión de Ventas</h1>
        <div className="h-1 bg-red-600 mb-4"></div>
      </div>
    </div>
  );
};

export default HomeAdmin;