const Post = require("../models/post");
const PostService = require("../service/postService");
const handleError = require("../utils/handle-error");

class PostController {
	async getPosts(req, res) {
		try {
			const userId = req.user.id;
			const { _offset, _limit, _tab, _genre } = req.query;
			const posts = await PostService.getPosts({ _offset: _offset ?? 0, _limit: _limit ?? 9, userId, _tab, _genre });
			res.status(200).json(posts);
		} catch (e) {
			console.log(e);
			handleError(res, e);
		}
	}

	async getPost(req, res) {
		try {
			const postId = req.params.id;
			const post = await PostService.getPost(postId);
			res.status(200).json(post);
		} catch (e) {
			handleError(res, e);
		}
	}

	async likePost(req, res) {
		try {
			const userId = req.user.id;
			const postId = req.params.id;
			const updatedPost = await PostService.likePost(postId, userId);
			res.status(200).json(updatedPost);
		} catch (e) {
			handleError(res, e);
		}
	}

	async dislikePost(req, res) {
		try {
			const userId = req.user.id;
			const postId = req.params.id;
			const updatedPost = await PostService.dislikePost(postId, userId);
			res.status(200).json(updatedPost);
		} catch (e) {
			handleError(res, e);
		}
	}

	async setPostFavorite(req, res) {
		try {
			const userId = req.user.id;
			const postId = req.params.id;
			const updatedUser = await PostService.setPostFavorite(postId, userId);
			res.status(200).json(updatedUser);
		} catch (e) {
			console.log(e);
			handleError(res, e);
		}
	}

	async deletePost(req, res) {
		try {
			const postId = req.params.id;
			const deletedPost = await PostService.deletePost(postId);
			res.status(200).json(deletedPost);
		} catch (e) {
			handleError(res, error);
		}
	}

	async addPost(req, res) {
		try {
			const userId = req.user.id;
			const postData = req.body;
			const file = req.file;

			const newPost = await PostService.addPost(postData, file, userId);
			res.status(201).json(newPost);
		} catch (e) {
			console.log(e);
			handleError(res, e);
		}
	}

	async updatePost(req, res) {
		try {
			const updatedPost = await PostService.updatePost(req.params.id, req.body);
			res.status(200).json(updatedPost);
		} catch (e) {
			handleError(res, e);
		}
	}
}

module.exports = new PostController();
