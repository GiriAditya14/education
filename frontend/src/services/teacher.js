import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/teachers`;

const getTeacherStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/me/stats`, config);
  return response.data;
};

export default {
  getTeacherStats,
};