import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Tooltip from '@mui/material/Tooltip';

const SidebarWaiter: React.FC = () => {

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('accessToken', {path : "/"});
    setTimeout(() => {
      router.push('/');
    }, 1000)
  };

  return (
    <div className="bg-gray-800 min-h-screen flex">
      <div className="bg-gray-900 h-auto w-28 flex flex-col items-center py-8 rounded-tr-3xl rounded-br-3xl border border-gray-800 flex-grow">
        <div className="text-center mb-6" onClick={() => window.location.href = '/user/home-waiter'}>
          <Tooltip title="Inicio" placement='right'>
            <img src="/images/logo.png" alt="Restock Restaurant" className="mx-auto" style={{cursor: 'pointer'}} width={200} height={200} />
          </Tooltip>
        </div>
        <nav className="flex flex-col flex-grow space-y-12">
          <a className="text-red-500 hover:text-red-400 mt-auto mb-10" style={{cursor: 'pointer'}} onClick={handleLogout}>
            <Tooltip title="Cerrar Sesión" placement='right'> 
              <LogoutIcon fontSize='large' />
            </Tooltip>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SidebarWaiter;
