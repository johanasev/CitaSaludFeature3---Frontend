import { useEffect, useState } from 'react';

export interface Especialidad {
  id: string;
  nombre: string;
}

export const useEspecialidades = () => {
  const [data, setData] = useState<Especialidad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/especialidades') // Ajusta si usas otro puerto o ruta
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
