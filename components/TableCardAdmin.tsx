import React from "react";

type TableCardPropsAdmin = {
  name: string;
  capacity: number;
  status: string;
};

const TableCardAdmin: React.FC<TableCardPropsAdmin> = ({ name, capacity, status }) => {

  const circleColor = status === "Disponible" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`p-4 rounded-lg text-center cursor-pointer relative ${status === "Disponible" ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-700 hover:bg-gray-600"}`}
      
    >
      <div
        className={`absolute top-0 right-0 h-4 w-4 ${circleColor} rounded-full m-2`}
      ></div>
      <div className="text-4xl mb-2">🍽️</div>
      <div className="text-xl">{name}</div>
      <div className="text-sm">Comensales: {capacity} personas</div>
      <div className="text-sm">Estado: {status}</div>
    </div>
  );
};

export default TableCardAdmin;
