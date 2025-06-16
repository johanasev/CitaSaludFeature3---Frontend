import React from 'react';
import { Doctor } from '@/types/Doctor';

interface Props {
  doctors: Doctor[];
  onAdd: (id: number) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const DoctorScheduleTable: React.FC<Props> = ({ doctors, onAdd, onUpdate, onDelete }) => {
const formatHorario = (doctor: Doctor) => {
  if (!doctor.franjasDisponibles || doctor.franjasDisponibles.length === 0) {
    return "-";
  }

  return doctor.franjasDisponibles.map((f) => {
    const hi = f.horaInicio;
    const hf = f.horaFin;

    if (!hi || !hf) return "-";

    const parseHora = (hora: string) => {
      const [hour, minute] = hora.split(":");
      return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    };

    const horaInicioStr = typeof hi === "string" ? parseHora(hi) : "--:--";
    const horaFinStr = typeof hf === "string" ? parseHora(hf) : "--:--";

    return `${horaInicioStr} - ${horaFinStr}`;
  }).join(" / ");
};

  const formatDias = (doctor: Doctor) => {
    if (!doctor.franjasDisponibles || doctor.franjasDisponibles.length === 0) {
      return "-";
    }

    return doctor.franjasDisponibles
      .map((f) => f.dias?.join(', '))
      .filter(Boolean)
      .join(" / ");
  };

  const formatRango = (doctor: Doctor) => {
    if (!doctor.franjasDisponibles || doctor.franjasDisponibles.length === 0) {
      return "-";
    }

    return doctor.franjasDisponibles
      .map((f) => `${f.fechaInicio ?? '--'} - ${f.fechaFin ?? '--'}`)
      .join(" / ");
  };

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
            <th className="p-2">Rango</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="p-2">{doctor.nombre} {doctor.apellido}</td>
              <td className="p-2">{doctor.tipoDocumento}</td>
              <td className="p-2">{doctor.numeroDocumento}</td>
              <td className="p-2">{doctor.especialidadNombre || '-'}</td>
              <td className="p-2">{formatDias(doctor)}</td>
              <td className="p-2">{formatHorario(doctor)}</td>
              <td className="p-2">{formatRango(doctor)}</td>
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
