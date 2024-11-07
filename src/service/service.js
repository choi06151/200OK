import axios from 'axios';

const AMAZON_API_BASE_URL = 'http://localhost:8080/amazon';

export const createUser = (user) =>
  axios.post(`${AMAZON_API_BASE_URL}/user`, user, {
    headers: { 'Content-Type': 'application/json' },
  });

export const initStory = async (id) => {
  await axios.get(`${AMAZON_API_BASE_URL}/story/init/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const generateStory = (id) => {
  axios.post(`${AMAZON_API_BASE_URL}/story/generate/${id}`);
};
