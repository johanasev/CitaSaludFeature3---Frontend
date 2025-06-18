import axios from 'axios';

export const fetchEspecialidades = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/especialidades`);
  return response.data;
};
