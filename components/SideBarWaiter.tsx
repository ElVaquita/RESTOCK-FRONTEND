import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';


const SidebarWaiter: React.FC = () => {
  return (
    <div className="bg-gray-800 h-screen flex">
      <div className="bg-gray-900 h-full w-28 flex flex-col items-center py-8 rounded-tr-3xl rounded-br-3xl border border-gray-800">
        <div className="text-center mb-6">
          <img src="/images/logo.png" alt="Restock Restaurant" className="mx-auto" width={200} height={200} />
        </div>
        <nav className="flex flex-col flex-grow space-y-12">
          <a href="/" className="text-red-500 hover:text-red-400 mt-auto mb-10">
            <LogoutIcon fontSize='large' />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SidebarWaiter;
