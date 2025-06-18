// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Rutas donde Tailwind buscará las clases CSS
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Si tienes otros directorios con componentes o páginas, añádelos aquí.
    // Por ejemplo: "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cs-blue': '#5E7FD3', // Azul del formulario
        'cs-dark-blue': '#1A50D8', // Azul oscuro para el header y bordes
        'cs-green': '#1DD313', // Verde para el botón ACEPTAR
        'cs-red': '#D95656', // Rojo para mensajes de error
        'cs-light-gray': '#D9DBE0', // Gris claro para el fondo de la página
        'cs-dark-gray': '#474A50', // Gris oscuro (si lo usas en algún lugar)
      },
    },
  },
  plugins: [],
}