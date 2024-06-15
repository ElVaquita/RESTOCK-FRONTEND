// next.config.js
module.exports = {
  // Define las extensiones de archivos de tus páginas
  pageExtensions: ['tsx', 'jsx', 'js', 'ts'],
  reactStrictMode: true,

  // Define una función para generar rutas de páginas dinámicas
  async rewrites() {
    return [
      // Ejemplo de reescritura para rutas dinámicas
      { source: '/app/table/:id', destination: '/app/table/[id]' },
    ];
  },

  // Otras configuraciones de Next.js aquí
};
