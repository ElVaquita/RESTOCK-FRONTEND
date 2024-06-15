"use client";
import { Input, Button, Card } from '@nextui-org/react';
import CloseIcon from '@mui/icons-material/Close';
import '@/styles/globals.css'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerBack } from '@/services/auth.service';

export default function Register() {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const register = await registerBack({name:name, rut:rut, email: email, password: password});
      router.push('/');
    } catch (error) {
      console.error(error);
      alert("Failed to register. Please check your credentials and try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gray-900">
      <img src="/images/Restaurant.jpeg" alt="Restaurant" className="absolute inset-0 object-cover w-full h-full" />
      <div className="relative z-10 flex flex-1 items-center justify-center p-10">
        <Card className="max-w-md w-full p-8 bg-secondary ">
          <div className="text-center mb-6">
            <h3 className="text-white text-2xl font-bold mt-4">Registro de cuenta</h3>
            <CloseIcon className="absolute top-4 right-4 text-white cursor-pointer" onClick={() => window.location.href = '/login'} />          </div>
          <div className="mb-4">
            <Input
              isRequired
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Nombre</span>}
              placeholder=" "
              className="mb-4 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              isRequired
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Rut</span>}
              placeholder=" "
              className="mb-4 input-field text-white"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              isRequired
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Correo</span>}
              placeholder=" "
              className="mb-4 input-field text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              isRequired
              labelPlacement="outside"
              variant="bordered"
              label={<span className="input-label">Contraseña</span>}
              placeholder=" "
              type="password"
              className="mb-4 input-field text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            color="primary"
            radius="none"
            className="w-full bg-orange"
            onClick={handleRegister}
          >
            Registrar
          </Button>
        </Card>
      </div>
    </div>
  );
}
