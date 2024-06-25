"use client";

import React, { useState, useEffect } from 'react';
import TableCardAdmin from '../../../components/TableCardAdmin';
import SidebarAdmin from '../../../components/SideBarAdmin';
import { getAllTablesBack, createTableBack } from '../../../services/order.service';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import { jwtVerify } from 'jose';
import { getUserBack } from '@/services/auth.service';
import Alert from '@mui/material/Alert';
import {createTableSchema} from '../../../validation/create_table-schema';
import * as Yup from 'yup';

interface Table {
  id: number;
  name: string;
  quantity: number;
  state: string;
}

const TablesAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameUser, setUserName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [state, setState] = useState('Disponible');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [tableCreated, setTableCreated] = useState(false);
  const validationSchema = createTableSchema;

  const fechaChile = new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago' });
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
  useEffect(() => {

    fetchTables();
  }, []);

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setName('');
    setQuantity(0);
    setState('Disponible');
  };

  const handleCreateTable = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      await validationSchema.validate({name,quantity,state}, {abortEarly: false})
      await createTableBack(name, quantity, state, accessToken);
      setTableCreated(true);
      closeCreateModal();
      setGeneralError('');
      fetchTables();
      setTimeout(() => setTableCreated(false), 5000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach(err => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        fetchTables();
        setGeneralError('Error al crear la mesa, por favor intente de nuevo');
      }
    }
  };

  const clearError = (field: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="p-8 bg-gray-800 min-h-screen text-white flex-1">
        <div className='flex justify-between items-center mb-4'>
          <h1 className="text-2xl">Bienvenido, {nameUser}</h1>
          <h2 className="text-2xl">Mesas en el local</h2>

          <div className="flex items-center">
            <SearchIcon className='text-white mr-2' />
            <input
              type="text"
              placeholder="Buscar mesa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-lg bg-gray-700"
            />
            <button 
              className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg ml-4"
              onClick={openCreateModal}
            >
              Crear mesa
            </button>
          </div>
        </div>
        <div className="h-1 bg-red-600 mb-4"></div>
        <p className="text-xl mb-8">{fechaChile}</p>
        {(filteredTables.length === 0 || tables.length === 0) ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
            <SearchOffIcon style={{ fontSize: 60, marginBottom: 16 }} />
            <p className="text-xl">No se encontraron mesas</p>
          </Box>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTables.map((table) => (
              <TableCardAdmin key={table.id} name={table.name} capacity={table.quantity} status={table.state} />
            ))}
          </div>
        )}
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-4 rounded-lg w-1/2">
            <h2 className="text-lg mb-4 text-white">Crear mesa</h2>
            {generalError && <span className="block text-red-500 mb-4 text-sm">{generalError}</span>}
            <form>
              <div className="form-group text-white">
                <label htmlFor="name" className="block text-white">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => {
                    clearError('name');
                    setGeneralError('');
                  }}
                  className="w-full p-2 rounded-lg bg-gray-700"
                />
                {errors.name && <span className="block text-red-500 text-sm">{errors.name}</span>}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="quantity" className="block text-white">Capacidad (max. 6)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  onFocus={() => {
                    clearError('quantity');
                    setGeneralError('');
                  }}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
                {errors.quantity && <span className="block text-red-500 text-sm">{errors.quantity}</span>}
              </div>
              <div className="form-group mt-4">
                <label htmlFor="state" className="block text-white">Estado</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  onFocus={() => {
                    clearError('state');
                    setGeneralError('');
                  }}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Ocupada">Ocupada</option>
                </select>
                {errors.state && <span className="block text-red-500 text-sm">{errors.state}</span>}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg mr-4"
                  onClick={closeCreateModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
                  onClick={handleCreateTable}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {tableCreated && (
        <div className="absolute top-0 left-0 w-full z-50">
          <Alert severity="success" sx={{ textAlign: 'center' }}>
            ¡Mesa creada con éxito!
          </Alert>
        </div>
      )}
    </div>
  );
};

export default TablesAdmin;
