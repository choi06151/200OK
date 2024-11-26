import axios from 'axios';

const AMAZON_API_BASE_URL = 'http://localhost:8080/amazon';

export const createUser = async (user) =>
	axios.post(`${AMAZON_API_BASE_URL}/user`, user, {
		headers: { 'Content-Type': 'application/json' },
	});

export const getUser = async (userId) => {
	return await axios.get(`${AMAZON_API_BASE_URL}/user/userInfo/${userId}`);
};

export const initStory = async (userId) => {
	await axios.get(`${AMAZON_API_BASE_URL}/story/init/${userId}`, {
		headers: { 'Content-Type': 'application/json' },
	});
};

export const getStory = async (userId) => {
	return await axios.get(`${AMAZON_API_BASE_URL}/story/currentStory/${userId}`);
};

export const getNextStory = async (userId, choice) => {
	return await axios.post(
		`${AMAZON_API_BASE_URL}/story/generate/${userId}`,
		choice
	);
};

export const getMonologue = async (userId) => {
	return await axios.get(`${AMAZON_API_BASE_URL}/story/monologue/${userId}`);
};

export const editWater = async (userId, quantity) => {
	return axios.patch(
		`${AMAZON_API_BASE_URL}/user/userInfo/editWater/${userId}/${quantity}`
	);
};

export const editFood = async (userId, quantity) => {
	return await axios.patch(
		`${AMAZON_API_BASE_URL}/user/userInfo/editFood/${userId}/${quantity}`
	);
};

export const getRanking = async () => {
	return await axios.get(`${AMAZON_API_BASE_URL}/rank`);
};
