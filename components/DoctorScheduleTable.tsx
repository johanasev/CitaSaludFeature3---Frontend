// components/DoctorScheduleTable.tsx
import React from 'react';
// Importa Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'; // Íconos para Agregar, Eliminar, Actualizar

import { Doctor } from '@/types/Doctor'; // Asegúrate de que esta interfaz esté correctamente definida en tu archivo Doctor.ts

interface Props {
  doctors: Doctor[];
  onAdd?: (id: number) => void; // Marcado como opcional
  onUpdate?: (id: number) => void; // Marcado como opcional
  onDelete?: (id: number) => void; // Marcado como opcional
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
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-8"> {/* Contenedor principal de la tabla */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#1A50D8]"> {/* Color de fondo del header de la tabla del diseño UX  */}
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Tipo de Id</th> {/* Actualizado según UX  */}
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Número de documento</th> {/* Actualizado según UX  */}
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Especialidad</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Días</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Horario</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Rango Fechas</th> {/* Mantenido del código existente */}
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Selección</th> {/* Actualizado según UX  */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200"> {/* Restaurado a clases convencionales */}
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                No hay médicos disponibles.
              </td>
            </tr>
          ) : (
            doctors.map((doctor, index) => (
              <tr key={doctor.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}> {/* Filas alternadas para legibilidad */}
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-900">{doctor.nombre} {doctor.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">{doctor.tipoDocumento}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">{doctor.numeroDocumento}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">{doctor.especialidadNombre || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">{formatDias(doctor)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">{formatHorario(doctor)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[14px] text-gray-700">{formatRango(doctor)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm space-x-2">
                  {/* Botón Agregar con icono y color verde del diseño UX  */}
                  {onAdd && ( // <--- Renderizado condicional añadido
                    <button
                      onClick={() => onAdd(doctor.id)}
                      className="p-2 rounded-full bg-[#1DD313] text-white hover:bg-green-700 transition-colors"
                      title="Agregar horario"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                    </button>
                  )}
                  {/* Botón Eliminar con icono y color rojo del diseño UX  */}
                  {onDelete && ( // <--- Renderizado condicional añadido
                    <button
                      onClick={() => onDelete(doctor.id)}
                      className="p-2 rounded-full bg-[#D95656] text-white hover:bg-red-700 transition-colors"
                      title="Eliminar horario"
                    >
                      <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
                    </button>
                  )}
                  {/* Botón Actualizar con icono y color azul del diseño UX  */}
                  {onUpdate && ( // <--- Renderizado condicional añadido
                    <button
                      onClick={() => onUpdate(doctor.id)}
                      className="p-2 rounded-full bg-[#5E7FD3] text-white hover:bg-blue-700 transition-colors"
                      title="Actualizar horario"
                    >
                      <FontAwesomeIcon icon={faSyncAlt} className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorScheduleTable;