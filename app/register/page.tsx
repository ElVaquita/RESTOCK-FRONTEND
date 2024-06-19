"use client";
import { Input, Button, Card } from '@nextui-org/react';
import CloseIcon from '@mui/icons-material/Close';
import '@/styles/globals.css'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerBack } from '@/services/auth.service';
import * as Yup from 'yup';
import { registerSchema } from '../../validation/register-schema';

export default function Register() {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string>('');
  const validationSchema = registerSchema;

  const router = useRouter();

  const handleRegister = async () => {
    try {
      await validationSchema.validate({name,rut,email,password}, {abortEarly: false});
      const register = await registerBack({name:name, rut:rut, email: email, password: password});
      router.push('/');
      setErrors({});
      setGeneralError('');
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
        setGeneralError('Error al registrase. Verifique sus credenciales.');
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
    <div className="relative flex min-h-screen bg-gray-900">
      <img src="/images/Restaurant.jpeg" alt="Restaurant" className="absolute inset-0 object-cover w-full h-full" />
      <div className="relative z-10 flex flex-1 items-center justify-center p-10">
        <Card className="max-w-md w-full p-8 bg-secondary ">
          <div className="text-center mb-6">
            <h3 className="text-white text-2xl font-bold mt-4">Registro de cuenta</h3>
            <CloseIcon className="absolute top-4 right-4 text-white cursor-pointer" onClick={() => window.location.href = '/login'} />          </div>
          
            {generalError && <span className="block text-red-500 mb-4 text-sm">{generalError}</span>}
          
          <div className="mb-4">
            <Input
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Nombre</span>}
              placeholder=" "
              className="mb-4 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => {
                clearError('name');
                setGeneralError('');
              }}
            />
            {errors.name && <span className="block text-red-500 text-sm">{errors.name}</span>}
          </div>
          <div className="mb-4">
            <Input
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Rut</span>}
              placeholder=" "
              className="mb-4 input-field text-white"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              onFocus={() => {
                clearError('rut');
                setGeneralError('');
              }}
            />
            {errors.rut && <span className="block text-red-500 text-sm">{errors.rut}</span>}
          </div>
          <div className="mb-4">
            <Input
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Correo</span>}
              placeholder=" "
              className="mb-4 input-field text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => {
                clearError('email');
                setGeneralError('');
              }}
            />
            {errors.email && <span className="block text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <Input
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Contraseña</span>}
              placeholder=" "
              type="password"
              className="mb-4 input-field text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                clearError('password');
                setGeneralError('');
              }}
            />
            {errors.password && <span className="block text-red-500 text-sm">{errors.password}</span>}
          </div>
          <Button
            color="primary"
            radius="none"
            className="w-full bg-orange"
            onClick={handleRegister}
          >
            Registrar
          </Button>
          <div className="text-center text-sm text-gray-400">
            ¿Ya tienes una cuenta? <a href="/" className="underline">Iniciar sesión</a>
          </div>
        </Card>
      </div>
    </div>
  );
}
