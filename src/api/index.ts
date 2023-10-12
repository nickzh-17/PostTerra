import axios from "axios";
import { API_URL } from "config";
// import { getAccessToken } from "../utils/tokens";

export const client = axios.create({
	baseURL: `${API_URL}/api`,
});

export const authClient = axios.create({
	baseURL: `${API_URL}/api`,
});

authClient.interceptors.request.use(config => {
	// const accessToken = getAccessToken();

	// config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
});
