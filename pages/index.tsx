// pages/index.tsx
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-[#1A50D8] mb-4 drop-shadow-sm">Bienvenido a CitaSalud</h1>
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          Gestiona tus horarios médicos y citas de manera sencilla y eficiente.
        </p>
        <div className="flex flex-col space-y-4 items-center"> {/* Agregamos espacio vertical entre los botones con space-y-4 */}
          <button
            onClick={() => router.push('/login')}
            className="w-auto px-10 py-3 bg-[#5E7FD3] hover:bg-[#1A50D8] text-white font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5E7FD3] focus:ring-opacity-75 text-lg"
          >
            Iniciar sesión
          </button><br />
          <button
            onClick={() => router.push('/registro')}
            className="w-auto px-10 py-3 bg-white border-2 border-[#5E7FD3] text-[#5E7FD3] hover:bg-[#EBF2FF] font-bold rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5E7FD3] focus:ring-opacity-75 text-lg"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}