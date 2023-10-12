const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	genre: {
		type: String,
		ref: "Genre",
	},
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	creationDate: {
		type: String,
		required: true,
	},
	createdById: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	createdByName: {
		type: String,
		ref: "User",
	},
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
