import axios from 'axios';

const AMAZON_API_BASE_URL = 'http://localhost:8080/amazon';

export const createUser = (user) =>
  axios.post(`${AMAZON_API_BASE_URL}/user`, user, {
    headers: { 'Content-Type': 'application/json' },
  });

export const initStory = async (userId) => {
  await axios.get(`${AMAZON_API_BASE_URL}/story/init/${userId}`, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const generateStory = (userId) => {
  axios.post(`${AMAZON_API_BASE_URL}/story/generate/${userId}`);
};

export const getStory = async (userId) => {
  try {
    return await axios.get(
      `${AMAZON_API_BASE_URL}/story/currentStory/${userId}`
    );
  } catch (e) {
    // 스토리가 없을 경우 초기화하여 생성

    if (e.response && e.response.status === 404) {
      console.warn('스토리가 없어서 초기화합니다.');
      await initStory(userId);
      return await axios.get(
        `${AMAZON_API_BASE_URL}/story/currentStory/${userId}`
      );
    } else {
      throw e; // 다른 오류가 발생할 경우 다시 던짐
    }
  }
};

export const getNextStory = async (userId, choice) => {
  return await axios.post(
    `${AMAZON_API_BASE_URL}/story/generate/${userId}`,
    choice
  );
};
