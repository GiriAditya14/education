import axios from 'axios';

const API_URL = 'http://localhost:5000/api/zego';

const getZegoToken = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/token`, config);
  return response.data;
};

export default {
  getZegoToken,
};