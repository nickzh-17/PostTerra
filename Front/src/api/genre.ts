import { $api } from "api";
import { GenresResponse } from "types/api-types/response";

class GenreApi {
	async getGenres(): Promise<GenresResponse> {
		const res = await $api.get(`/genres`).then(res => res.data);
		return res;
	}
}

export default new GenreApi();
