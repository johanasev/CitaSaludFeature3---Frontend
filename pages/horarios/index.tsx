// pages/horarios/index.tsx
import React, { useEffect, useState } from 'react';
import DoctorScheduleTable from '../../components/DoctorScheduleTable';
import { useRouter } from 'next/router';
import { useMedicos } from '../../hooks/useMedicos';


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
    // Aquí puedes abrir un modal de "agregar"
  };

  const handleUpdate = (id: number) => {
    alert(`Actualizar horario del doctor ${id}`);
    // Aquí puedes abrir un modal de "actualizar"
  };

  const handleDelete = (id: number) => {
    alert(`Eliminar doctor ${id}`);
    // Aquí puedes abrir un modal de confirmación de "eliminar"
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  // Lógica corregida para formatear el rol
  const rolFormateado = rol === "ROLE_MEDICO"
    ? "Médico"
    : rol === "ROLE_COORDINADOR"
    ? "Coordinador"
    : rol === "ROLE_ADMIN"
    ? "Administrador"
    : rol; // Si no coincide con ninguno, se muestra el rol original

  const puedeModificar = rol === "ROLE_ADMIN" || rol === "ROLE_COORDINADOR" || rol === "ROLE_MEDICO";

  if (loading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#D9DBE0] font-inter">
        <p className="text-gray-700 text-lg">Cargando médicos...</p>
      </div>
    );
  }

  return (
    // Contenedor principal de la página: Fondo gris claro y ocupa toda la altura.
    <div className="relative min-h-screen flex flex-col items-center bg-[#D9DBE0] font-inter">
      {/* HEADER: Ancho completo, fondo azul oscuro, texto centrado, blanco y negrita */}
      <header className="w-full bg-[#1A50D8] py-4 shadow-lg flex justify-center items-center"> {/* Restaurado a #1A50D8 */}
        <h1 className="text-white text-4xl font-extrabold tracking-wide">CITA SALUD</h1>
      </header>

      {/* Contenido principal de la página (la tabla y el saludo) */}
      <div className="flex-grow w-full max-w-7xl mx-auto p-6"> {/* max-w-7xl para limitar el ancho y centrar */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Lista de Turnos de Atención</h1>
        
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="text-lg text-gray-700">
            Hola, tu rol es: <span className="font-bold text-[#1A50D8]">{rolFormateado}</span> {/* Color azul oscuro para el rol */}
          </div>
          <button
            onClick={handleLogout}
            className="bg-[#D95656] text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors text-base font-semibold" /* Rojo del diseño UX */
          >
            Cerrar sesión
          </button>
        </div>
        {/* <br /> se puede lograr con margin-bottom en el div anterior o margin-top en la tabla si es necesario */}

        <DoctorScheduleTable
          doctors={doctors}
          // Si 'puedeModificar' es true, pasa la función. Si es false, pasa 'undefined'.
          onAdd={puedeModificar ? handleAdd : undefined}
          onUpdate={puedeModificar ? handleUpdate : undefined}
          onDelete={puedeModificar ? handleDelete : undefined}
        />
      </div>
    </div>
  );
};

export default HorariosPage;