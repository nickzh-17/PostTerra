import { $api, client } from "api";
import axios from "axios";
import { API_URL } from "config";
import { LoginParams, RegistrationParams } from "types/api-types/request";
import { LoginResponse, RegistrationResponse } from "types/api-types/response";

class AuthApi {
	async registration(body: RegistrationParams): Promise<RegistrationResponse> {
		// const res = await client.post("/auth/registration", body).then(res => res.data);
		const res = await client.post("/auth/registration", body).then(res => res.data);
		return res;
	}

	async login(body: LoginParams): Promise<LoginResponse> {
		const res = await $api.post<LoginResponse>("/auth/login", body);
		return res.data;
	}

	async activate(link: string): Promise<string> {
		const res = await client.get(`/auth/activate/${link}`).then(res => res.data);
		return res;
	}

	async logout(): Promise<void> {
		const res = await $api.post("/auth/logout").then(res => res.data);
		return res;
	}

	async checkAuth() {
		const res = await axios.get(`${API_URL}/api/auth/refresh`, { withCredentials: true }).then(res => res.data);
		return res;
	}
}

export default new AuthApi();
