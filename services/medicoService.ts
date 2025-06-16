// services/medicoService.ts

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchMedicos = async () => {
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWxvbWUubWFycXVlekBjaXRhc2FsdWQuY29tIiwiaWF0IjoxNzUwMDE1NzY3LCJleHAiOjE3NTAxMDIxNjd9.TNTEYGuf89D95VwMEqZqYZ9Bh1frxVeQKPkozgsYb2PRDpiYna1YHXqjnHoC_sy-sb_9nC8N6c2Zwg2k5e8hMA";

  const response = await fetch(`${baseUrl}/api/medicos/confranjas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener médicos");
  return response.json();
};