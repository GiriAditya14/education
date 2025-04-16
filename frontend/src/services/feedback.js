import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/feedback`;

const submitFeedback = async (questionId, rating, feedbackText, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL,
    { questionId, rating, feedbackText },
    config
  );
  return response.data;
};

export default {
  submitFeedback,
};