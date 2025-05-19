import React, { useState } from 'react';
import DoctorScheduleTable from '../../components/DoctorScheduleTable';
import { Doctor } from '../../types/Doctor';

const HorariosPreviewPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dra. Ana Pérez',
      documentType: 'CC',
      documentNumber: '12345678',
      specialty: 'Pediatría',
    },
    {
      id: '2',
      name: 'Dr. Juan Gómez',
      documentType: 'TI',
      documentNumber: '87654321',
      specialty: 'Cardiología',
    },
  ]);

  const handleAdd = (id: string) => {
    alert(`Agregar horario al doctor ${id}`);
  };

  const handleUpdate = (id: string) => {
    alert(`Actualizar horario del doctor ${id}`);
  };

  const handleDelete = (id: string) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Vista Previa - Lista de Turnos de Atención</h1>
      <DoctorScheduleTable
        doctors={doctors}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HorariosPreviewPage;
