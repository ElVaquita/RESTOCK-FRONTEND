import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const SidebarAdmin: React.FC = () => {
  return (
    <div className="bg-gray-800 min-h-screen flex">
     <div className="bg-gray-900 h-auto w-28 flex flex-col items-center py-8 rounded-tr-3xl rounded-br-3xl border border-gray-800 flex-grow">
        <div className="text-center mb-6">
          <img src="/images/logo.png" alt="Restock Restaurant" className="mx-auto" width={200} height={200} />
        </div>
        <nav className="flex flex-col flex-grow space-y-12">
          <a href="/admin/home" className="text-red-500 hover:text-red-400">
            <HomeIcon fontSize='large' />
          </a>
          <a href="/admin/inventory" className="text-red-500 hover:text-red-400">
            <InventoryIcon fontSize='large' />
          </a>
          <a href="/admin/tickets" className="text-red-500 hover:text-red-400">
            <AppRegistrationIcon fontSize='large' />
          </a>
          <a href="/" className="text-red-500 hover:text-red-400 mt-auto mb-10">
            <LogoutIcon fontSize='large' />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SidebarAdmin;
