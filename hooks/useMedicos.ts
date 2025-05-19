// hooks/useMedicos.ts

import { useState, useEffect } from 'react';
import { fetchMedicos } from '@/services/medicoService';

export const useMedicos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicos()
      .then(setData)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
