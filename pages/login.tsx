// pages/login.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import ModalLoginError from '../components/ModalLoginError'; // importa el modal


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const [showErrorModal, setShowErrorModal] = useState(false);


const handleLogin = async () => {
  try {
    const response = await axios.post('https://citasaludfeature3.onrender.com/api/auth/login', {
      email,
      password
    })

    const { jwt, email: userEmail, role } = response.data;

    // Guardamos en localStorage
    localStorage.setItem('token', jwt);
    localStorage.setItem('email', userEmail);
    localStorage.setItem('rol', role);

    setError('')
    router.push('/horarios')
  } catch (e) {
     setShowErrorModal(true);
  }
}


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-semibold text-center">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Aceptar
        </button>
        <p className="text-sm mt-2 text-center">
        ¿No tienes cuenta?{' '}<br />
            <a href="/registro" className="text-blue-600 hover:underline">
                Registrate
            </a>
        </p>
        <ModalLoginError
        visible={showErrorModal}
        onClose={() => {
            setEmail('');
            setPassword('');
            setShowErrorModal(false);
        }}
        />
      </div>
    </div>
  )
}
