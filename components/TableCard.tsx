import React from 'react';
import { useRouter } from 'next/router'; // Import correct router from next

type TableCardProps = {
  name: string;
  capacity: number;
  status: string;
};

const TableCard: React.FC<TableCardProps> = ({ name, capacity, status }) => {
  // const router = useRouter();

  // const handleCardClick = () => {
  //   router.push(`/app/table/${name}/page`);
  // };

  const circleColor = status === 'Disponible' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div 
      className={`p-4 rounded-lg text-center cursor-pointer relative ${status === 'Disponible' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}`} 
      // onClick={handleCardClick} 
    >
      <div className={`absolute top-0 right-0 h-4 w-4 ${circleColor} rounded-full m-2`}></div>
      <div className="text-4xl mb-2">🍽️</div>
      <div className="text-xl">{name}</div>
      <div className="text-sm">Capacidad: {capacity} personas</div>
      <div className="text-sm">Estado: {status}</div>
    </div>
  );
};

export default TableCard;
