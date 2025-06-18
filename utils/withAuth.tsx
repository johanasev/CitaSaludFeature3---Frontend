// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ModalLoginError from '../components/ModalLoginError'; // importa el modal

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Lo mantenemos por si acaso
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { jwt, email: userEmail, role } = response.data;

      // Guardamos en localStorage
      localStorage.setItem('token', jwt);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('rol', role);

      setError(''); // Limpiamos cualquier error previo
      router.push('/horarios');
    } catch (e) {
      setShowErrorModal(true);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#D9DBE0] font-inter"> {/* Fondo gris claro del PDF  */}
      {/* Header fijo en la parte superior: CITA SALUD a todo el ancho */}
      <header className="w-full bg-[#1A50D8] py-4 shadow-lg flex justify-center items-center"> {/* Azul oscuro del PDF  */}
        <h1 className="text-white text-4xl font-extrabold tracking-wide">CITA SALUD</h1>
      </header>

      {/* Contenedor principal que centra el formulario de login en la pantalla */}
      <div className="flex-grow flex justify-center items-center w-full px-4 py-8">
        <div
          className="
            bg-[#5E7FD3] p-8 rounded-xl shadow-2xl border-2 border-[#1A50D8] /* Fondo azul principal y borde azul oscuro del PDF  */
            max-w-md                     /* Ancho máximo: 384px por defecto, para que sea una columna central */
            w-full                       /* Ocupa el 100% del espacio disponible, limitado por max-w-md */
            h-auto min-h-[70vh]          /* Altura: mínimo 70% del viewport height, ajustándose al contenido. Permite más espacio. */
            flex flex-col justify-center items-center text-center /* Centra todo el contenido vertical y horizontalmente */
          "
        >
          {/* Título "Iniciar sesión" dentro del formulario */}
          <h2 className="text-white text-3xl font-bold mb-6 mt-4">Iniciar sesión</h2>
          
          {/* Contenedor para inputs y botones, controla su espacio vertical */}
          <div className="w-full max-w-xs space-y-6 flex flex-col"> {/* max-w-xs para que inputs/botones sean más estrechos y proporcionales */}
            <div>
              <label htmlFor="email" className="block text-white text-lg font-semibold mb-2 text-left">
                Usuario (Correo electrónico)
              </label>
              <input
                type="text"
                id="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#1A50D8] focus:ring-2 focus:ring-[#1A50D8] focus:outline-none text-gray-800 text-base shadow-inner placeholder-gray-500" /* py-3 para más altura */
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white text-lg font-semibold mb-2 text-left">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#1A50D8] focus:ring-2 focus:ring-[#1A50D8] focus:outline-none text-gray-800 text-base shadow-inner placeholder-gray-500" /* py-3 para más altura */
                required
              />
            </div>

            {/* Mensaje de error (si hay) */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            {/* Enlace "Registrarse" */}
            <div className="flex justify-center mt-4"> {/* Asegura que el enlace esté centrado */}
              <a href="/registro" className="text-white hover:underline text-base font-semibold transition-colors duration-200">
                Registrarse
              </a>
            </div>

            {/* Botón de Aceptar */}
            <button
              onClick={handleLogin}
              [cite_start]className="w-full bg-[#1DD313] hover:bg-[#1A50D8] text-white text-xl font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1DD313] focus:ring-opacity-75 mt-6" /* Verde del PDF [cite: 18] */
            >
              ACEPTAR
            </button>
          </div>
        </div>
      </div>

      {/* Modal de error de login (tu componente existente) */}
      <ModalLoginError
        visible={showErrorModal}
        onClose={() => {
          setEmail('');
          setPassword('');
          setShowErrorModal(false);
        }}
      />
    </div>
  );
}