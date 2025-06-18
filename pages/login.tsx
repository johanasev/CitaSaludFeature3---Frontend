import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ModalLoginError from '../components/ModalLoginError';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { jwt, email: userEmail, role } = response.data;

      localStorage.setItem('token', jwt);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('rol', role);

      setError('');
      router.push('/horarios');
    } catch (e) {
      setShowErrorModal(true);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#D9DBE0] font-inter">
      <header className="w-full bg-[#5E7FD3] py-4 shadow-lg flex justify-center items-center">
        <h1 className="text-white text-4xl font-extrabold tracking-wide">CITA SALUD</h1>
      </header>

      <div className="flex-grow flex justify-center items-center w-full px-4 py-8">
        <div className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-2xl mb-4 font-semibold text-center">Iniciar sesión</h2>
          
            <ModalLoginError
                visible={showErrorModal}
                onClose={() => {
                setEmail('');
                setPassword('');
                setShowErrorModal(false);
                }}
            />
          <input
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-xl"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-xl"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-[#1DD313] text-white py-2 rounded hover:bg-blue-700"
          >
            Aceptar
          </button>
          <p className="text-sm mt-2 text-center">
            ¿No tienes cuenta? <br />
            <a href="/registro" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>

      {/* ✅ Modal flotante al final */}

    </div>
  );
}
