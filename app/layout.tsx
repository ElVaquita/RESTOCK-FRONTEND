import '@/styles/globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata = {
  title: 'Restock',
  description: 'El sistema de gestión para tu restaurante',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        {/* <header className="w-full bg-primary text-white p-4">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">RESTOCK</h1>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Inicio</Link>
            </div>
          </nav>
        </header> */}
        <CssBaseline />
        <main className="flex-grow">{children}</main>
        <footer className="w-full bg-primary text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Restock. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}




//Esto es una prueba