// components/ModalLoginError.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalLoginError: React.FC<Props> = ({ visible, onClose }) => {
  const router = useRouter();

  if (!visible) return null;

const volverAlLogin = () => {
  onClose();
  localStorage.removeItem("token");
  router.push('/login');
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[white] border-4 border-[red] rounded-lg p-8 text-center w-[400px] shadow-lg">
        <h2 className="text-[red] font-bold text-xl mb-4">¡LOGIN NO VÁLIDO!</h2>
        <p className="text-[red] mb-6">
          La información suministrada no corresponde con un usuario registrado en el sistema
        </p>
        <button
          onClick={volverAlLogin}
          className="bg-[#1DD313] text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Volver a intentar 
        </button>
      </div>
    </div>
  );
};

export default ModalLoginError;