"use client";
import { Input, Button, Card } from '@nextui-org/react';
import { useState } from 'react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/icons';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="relative flex-1">
        <img src="/images/Restaurant.jpeg" alt="Restaurant" className="object-cover w-full h-full" />
      </div>
      <div className="flex-1 flex items-center justify-center p-10">
        <Card className="max-w-md w-full p-8 bg-secondary">
          <div className="text-center mb-6">
            <img src="/images/logo.png" alt="Restock Restaurant" className="mx-auto" width={170} height={170} />
          </div>

          <div className="mb-4">
            <Input
              isRequired
              labelPlacement='outside'
              variant="bordered"
              label={<span className="input-label">Ingrese su correo</span>}
              placeholder=' '
              className="mb-4 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="mb-4">
            <Input
              isRequired
              labelPlacement='outside'
              variant="bordered"
              label={<span className="input-label">Ingrese su contraseña</span>}
              placeholder=' '
              
              className="mb-4 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
              </button>}
              type={isVisible ? "text" : "password"}
            />
          </div>
          <div className="text-sm text-orange mb-4">
            <a href="#" className="underline">¿Olvidó su nombre de usuario o contraseña?</a>
          </div>
          <Button
            color="primary"
            radius='none'
            className="w-full mb-4 bg-orange"
            onClick={handleLogin}
          >
            Acceder
          </Button>
          <div className="text-center text-sm text-gray-400">
            No tienes una cuenta? <a href="/register" className="underline">Registro</a>
          </div>
        </Card>
      </div>
    </div>
  );
}
