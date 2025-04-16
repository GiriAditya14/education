import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/question`;

const createQuestion = async (text, imageUrl, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, { text, imageUrl }, config);
  return response.data;
};

const getOpenQuestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/open`, config);
  return response.data;
};

const acceptQuestion = async (questionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/${questionId}/accept`, {}, config);
  return response.data;
};

const getMyQuestions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/my`, config);
  return response.data;
};

export default {
  createQuestion,
  getOpenQuestions,
  acceptQuestion,
  getMyQuestions,
};