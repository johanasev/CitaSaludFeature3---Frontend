import axios from 'axios';

export const fetchRoles = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/roles`);
  return response.data;
};
