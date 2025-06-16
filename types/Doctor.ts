export interface FranjaDisponible {
  dias: string[]; // Ej: ["LUNES", "MIERCOLES"]
  fechaInicio: string; // formato "YYYY-MM-DD"
  fechaFin: string;    // formato "YYYY-MM-DD"
  horaInicio: string;  // ahora es string
  horaFin: string;     // ahora es string
}


export interface Doctor {
  id: number;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  especialidadId: number;
  especialidadNombre: string;
  franjasDisponibles: FranjaDisponible[];
}
