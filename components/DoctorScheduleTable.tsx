import React from 'react';
import { Doctor } from '@/types/Doctor';

interface Props {
  doctors: Doctor[];
  onAdd: (id: string) => void;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const DoctorScheduleTable: React.FC<Props> = ({ doctors, onAdd, onUpdate, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg p-4 bg-white">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Nombre</th>
            <th className="p-2">Tipo Documento</th>
            <th className="p-2">Número</th>
            <th className="p-2">Especialidad</th>
            <th className="p-2">Días</th>
            <th className="p-2">Horario</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="p-2">{doctor.name}</td>
              <td className="p-2">{doctor.documentType}</td>
              <td className="p-2">{doctor.documentNumber}</td>
              <td className="p-2">{doctor.specialty}</td>
              <td className="p-2">{doctor.days || '-'}</td>
              <td className="p-2">{doctor.schedule || '-'}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onAdd(doctor.id)} className="bg-green-500 text-white px-2 py-1 rounded">Agregar</button>
                <button onClick={() => onUpdate(doctor.id)} className="bg-yellow-400 text-white px-2 py-1 rounded">Actualizar</button>
                <button onClick={() => onDelete(doctor.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorScheduleTable;
