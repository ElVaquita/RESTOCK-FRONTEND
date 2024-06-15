"use client";

import React, { useState } from 'react';
import TableCard from '../../../components/TableCard';
import SidebarWaiter from '../../../components/SideBarWaiter';
import SearchIcon from '@mui/icons-material/Search';

const HomeWaiterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const tables = [
    { name: 'Mesa 1', capacity: 4, status: 'Disponible' },
    { name: 'Mesa 2', capacity: 2, status: 'Ocupada' },
    { name: 'Mesa 3', capacity: 6, status: 'Disponible' },
    { name: 'Mesa 4', capacity: 4, status: 'Ocupada' },
    { name: 'Mesa 5', capacity: 2, status: 'Ocupada' },
    { name: 'Mesa 6', capacity: 6, status: 'Disponible' },
    { name: 'Mesa 7', capacity: 4, status: 'Ocupada' },
    { name: 'Mesa 8', capacity: 2, status: 'Disponible' },
    { name: 'Mesa 9', capacity: 6, status: 'Ocupada' },
    { name: 'Mesa 10', capacity: 4, status: 'Disponible' },
    { name: 'Mesa 11', capacity: 2, status: 'Disponible' },
    { name: 'Mesa 12', capacity: 6, status: 'Ocupada' },
    { name: 'Mesa 13', capacity: 4, status: 'Disponible' },
    { name: 'Mesa 14', capacity: 2, status: 'Ocupada' },
    { name: 'Mesa 15', capacity: 6, status: 'Disponible' },
    { name: 'Mesa 16', capacity: 4, status: 'Ocupada' },
    { name: 'Mesa 17', capacity: 2, status: 'Disponible' },
    { name: 'Mesa 18', capacity: 6, status: 'Disponible' },
    { name: 'Mesa 19', capacity: 4, status: 'Ocupada' },
    { name: 'Mesa 20', capacity: 2, status: 'Disponible' },

  ];
  const fechaChile = new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago' });  
  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <SidebarWaiter />
      <div className="p-8 bg-gray-800 min-h-screen text-white flex-1">
        <div className='flex justify-between items-center mb-4'>
          <h1 className="text-2xl">Mesas Disponibles</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <TableCard key={table.name} name={table.name} capacity={table.capacity} status={table.status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeWaiterPage;
