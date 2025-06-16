// hooks/useMedicos.ts
import { useState, useEffect } from 'react';
import { fetchMedicos } from '@/services/medicoService';
import { Doctor } from '@/types/Doctor';

export const useMedicos = () => {
  const [data, setData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicos()
      .then((data) => {
        console.log("🔍 Datos recibidos:", data);
        setData(data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
