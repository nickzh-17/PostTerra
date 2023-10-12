// const ApiError = require("../exceptions/api-error");
const GenreModel = require("../models/genre");

class GenreService {
	async getGenres() {
		const genres = await GenreModel.find();
		return { genres };
	}

	async addGenre(genreData) {
		const result = await GenreModel.create(genreData);
		return result;
	}

	async deleteGenre(genreValue) {
		const result = await GenreModel.findOneAndDelete({ value: genreValue });
		return result;
	}

	async updateGenre(genreValue, genreData) {
		const result = await GenreModel.findOneAndUpdate({ value: genreValue }, genreData, { new: true });
		return result;
	}
}

module.exports = new GenreService();
