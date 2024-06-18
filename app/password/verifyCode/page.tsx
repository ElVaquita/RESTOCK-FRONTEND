'use client'

import { Input, Button, Card } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyCodeBack } from '@/services/auth.service';


const VerifyCodePage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleVerifyCode = async () => {
    setError('');
    try {
      const response = await verifyCodeBack({ email, code });
      setSuccessMessage('Código verificado correctamente.');
      setTimeout(() => {
        router.push('/password/changePassword');
      }, 3000);
    } catch (error) {
      setError('Error al verificar el código.');
    }
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

          <h1 className="text-center text-white mb-6">Verificación de código enviado a su correo</h1>

          {error && <span className="block text-red-500 mb-4 text-sm">{error}</span>}
          {successMessage && <span className="block text-green-500 mb-4 text-sm">{successMessage}</span>}

          <div className="mb-4">
            <Input
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
              labelPlacement='outside'
              variant="bordered"
              label={<span className="input-label">Ingrese el código</span>}
              placeholder=' '
              className="mb-4 text-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <Button
            color="primary"
            radius='none'
            className="w-full mb-4 bg-orange"
            onClick={handleVerifyCode}
          >
            Verificar Código
          </Button>

          <div className="text-center text-sm text-gray-400">
            <a href="/login" className="underline">Volver al inicio de sesión</a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyCodePage;
