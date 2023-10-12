const Genre = require("../models/genre");
const GenreService = require("../service/genre-service");

class GenreController {
	async getGenres(req, res) {
		try {
			const genres = await GenreService.getGenres();
			res.status(200).json(genres);
		} catch (e) {
			handleError(e);
		}
	}

	async addGenre(req, res) {
		try {
			const genreData = req.body;
			const newGenre = await GenreService.addGenre(genreData);
			res.status(200).json(newGenre);
		} catch (e) {
			handleError(e);
		}
	}

	async deleteGenre(req, res) {
		try {
			const genreValue = req.params.value;
			const deletedGenre = await GenreService.deleteGenre(genreValue);
			res.status(200).json(deletedGenre);
		} catch (e) {
			handleError(e);
		}
	}

	async updateGenre(req, res) {
		try {
			const genreData = req.body;
			const genreValue = req.params.value;
			const updatedGenre = await GenreService.updateGenre(genreValue, genreData);
			res.status(200).json(updatedGenre);
		} catch (e) {
			handleError(e);
		}
	}
}

module.exports = new GenreController();
