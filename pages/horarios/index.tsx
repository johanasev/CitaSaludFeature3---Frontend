import React from 'react';
import DoctorScheduleTable from '../../components/DoctorScheduleTable';
import { useRouter } from 'next/router';
import { useMedicos } from '../../hooks/useMedicos';

const HorariosPage = () => {
  const { data: doctors, loading } = useMedicos();

  const handleAdd = (id: string) => {
    alert(`Agregar horario al doctor ${id}`);
  };

  const handleUpdate = (id: string) => {
    alert(`Actualizar horario del doctor ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`Eliminar doctor ${id}`);
    // Aquí puedes implementar un DELETE al backend si lo deseas
  };

  if (loading) {
    return <p className="p-6">Cargando médicos...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Turnos de Atención</h1>
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
