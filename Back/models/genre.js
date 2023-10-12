const { Schema, model } = require("mongoose");

const GenreModel = new Schema({
	value: { type: String, unique: true, required: true },
	label: { type: String, unique: true, required: true },
	sequence: { type: Number, unique: true, required: true },
});

module.exports = model("Genre", GenreModel);
