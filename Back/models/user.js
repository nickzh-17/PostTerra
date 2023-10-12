const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	roles: [{ type: String, ref: "Role" }],
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	favoritePosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	createdPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
