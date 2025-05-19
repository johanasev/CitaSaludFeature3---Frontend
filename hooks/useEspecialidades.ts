// hooks/useEspecialidades.ts
import { useEffect, useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Especialidad {
  id: string;
  nombre: string;
}

export const useEspecialidades = () => {
  const [data, setData] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`${baseUrl}/especialidades`)
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener especialidades');
      return res.json();
    })
    .then(setData)
    .catch((e) => console.error(e))
    .finally(() => setLoading(false));
}, []);

  return { data, loading };
};
