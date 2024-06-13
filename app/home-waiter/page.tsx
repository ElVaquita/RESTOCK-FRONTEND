"use client";

import React from 'react';
import TableCard from '../../components/TableCard';
import SidebarWaiter from '../../components/SideBarWaiter';

const HomeWaiterPage: React.FC = () => {
  const tables = [
    { name: 'Mesa 1', capacity: 4, status: 'Disponible' },
    { name: 'Mesa 2', capacity: 2, status: 'Ocupada' },
    { name: 'Mesa 3', capacity: 6, status: 'Disponible' },
    { name: 'Mesa 4', capacity: 4, status: 'Ocupada' },
    { name: 'Mesa 5', capacity: 2, status: 'Disponible' },
    { name: 'Mesa 6', capacity: 6, status: 'Disponible' },
    { name: 'Mesa 7', capacity: 4, status: 'Disponible' },
    { name: 'Mesa 8', capacity: 2, status: 'Disponible' },
    { name: 'Mesa 9', capacity: 6, status: 'Ocupada' },
    { name: 'Mesa 10', capacity: 4, status: 'Disponible' },
  ];

  return (
    <div className="flex">
      <SidebarWaiter />
      <div className="p-8 bg-gray-800 min-h-screen text-white flex-1">
        <h1 className="text-2xl mb-8">Mesas Disponibles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map((table) => (
            <TableCard key={table.name} name={table.name} capacity={table.capacity} status={table.status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeWaiterPage;
