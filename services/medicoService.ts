// services/medicoService.ts

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchMedicos = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error("No se encontró el token. Inicia sesión.");
  }

  const response = await fetch(`${baseUrl}/api/medicos/confranjas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener médicos");
  return response.json();
};