import React, { useEffect, useState } from 'react';
import DoctorScheduleTable from '../../components/DoctorScheduleTable';
import { useRouter } from 'next/router';
import { useMedicos } from '../../hooks/useMedicos';
//import withAuth from '@/utils/withAuth';


const HorariosPage = () => {
  const [rol, setRol] = useState('');
  const { data: doctors, loading } = useMedicos();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login');
    }

    const rolStorage = localStorage.getItem("rol");
    if (rolStorage) setRol(rolStorage);
  }, []);

  const handleAdd = (id: number) => {
    alert(`Agregar horario al doctor ${id}`);
  };

  const handleUpdate = (id: number) => {
    alert(`Actualizar horario del doctor ${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Eliminar doctor ${id}`);
  };

  const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};


  const rolFormateado = rol === "ROLE_MEDICO"
    ? "Médico"
    : rol === "ROLE_COORDINADOR"
    ? "Coordinador"
    : rol === "ROLE_ADMIN"
    ? "Administrador"
    : rol;

  if (loading) {
    return <p className="p-6">Cargando médicos...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Turnos de Atención</h1>
        <div className="flex justify-between items-center mb-2 text-sm">
          <div>Hola, tu rol es: <span className="font-semibold">{rolFormateado}</span></div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>


      <DoctorScheduleTable
        doctors={doctors}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HorariosPage;



