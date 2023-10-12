import axios from "axios";
import { API_URL } from "config";

export const client = axios.create({
	baseURL: `${API_URL}/api`,
});

export const $api = axios.create({
	withCredentials: true, // for cookies
	baseURL: `${API_URL}/api`,
});

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});

$api.interceptors.response.use(
	config => {
		return config;
	},
	async error => {
		const originalRequest = error.config;
		if (error.response.status === 401 && error.config && !error._isRetry) {
			originalRequest._isRetry = true;
			const res = await axios.get(`${API_URL}/api/auth/refresh`, { withCredentials: true }).then(res => res.data);
			localStorage.setItem("token", res.accessToken);
			return $api.request(originalRequest);
		}

		return Promise.reject(error);
	}
);
