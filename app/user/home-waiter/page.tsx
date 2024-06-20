"use client";

import React, { useState , useEffect} from 'react';
import TableCard from '../../../components/TableCard';
import SidebarWaiter from '../../../components/SideBarWaiter';
import SearchIcon from '@mui/icons-material/Search';
import { getAllTablesBack } from '../../../services/order.service';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';
import { getUserBack } from '@/services/auth.service';


interface Table {
  id: number;
  name: string;
  quantity: number;
  state: string;
}

const HomeWaiterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameUser, setUserName] = useState('');
  
  const fechaChile = new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago' });

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await getAllTablesBack(accessToken);
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        if (accessToken) {
          try {
            const { payload } = await jwtVerify(accessToken, secret);
            if (payload && typeof payload.id === 'number') {
              const userId = payload.id;
              const responseUser = await getUserBack(userId, accessToken);
              const userName = responseUser.user.name;
              setUserName(userName);
            }
          } catch (error) {
            console.error(error);
          }
        }
        if(response.tables){
          setTables(response.tables);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTables();
  }, []);

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <SidebarWaiter />
      <div className="p-8 bg-gray-800 min-h-screen text-white flex-1">
        <div className='flex justify-between items-center mb-4'>
          <h1 className="text-2xl">Bienvenido, {nameUser}</h1>
          <h2 className="text-2xl">Mesas Disponibles</h2>
          <div className="flex items-center">
            <SearchIcon className='text-white mr-2' />
            <input
              type="text"
              placeholder="Buscar mesa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-lg bg-gray-700"
            />
          </div>
        </div>
        <p className="text-xl mb-8">{fechaChile}</p>
        {(filteredTables.length === 0 || tables.length === 0 )? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
            <SearchOffIcon style={{ fontSize: 60, marginBottom: 16 }} />
            <p className="text-xl">No se encontraron mesas</p>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTables.map((table) => (
              <TableCard key={table.id} name={table.name} capacity={table.quantity} status={table.state} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeWaiterPage;
