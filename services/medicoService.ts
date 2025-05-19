// services/medicoService.ts

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchMedicos = async () => {
  const response = await fetch(`${baseUrl}/medicos`);
  if (!response.ok) throw new Error('Error al obtener médicos');
  return response.json();
};
