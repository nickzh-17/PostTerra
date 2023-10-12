const ImageService = require("./image-service");
const ApiError = require("../exceptions/api-error");
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const GenreModel = require("../models/genre");
const fs = require("fs").promises;

const PostDto = require("../dtos/post-dto");
const UserDto = require("../dtos/user-dto");

class PostService {
	async checkUserReaction(postId, userId, inUser = null) {
		const post = await PostModel.find({ _id: postId });
		const user = inUser ? inUser : await UserModel.findById(userId);

		const userLikeIndex = post[0].likes.findIndex(likeUserId => likeUserId.equals(user._id));
		const userDislikeIndex = post[0].dislikes.findIndex(dislikeUserId => dislikeUserId.equals(user._id));

		let isLikedByUser = false;
		let isDislikedByUser = false;

		if (userLikeIndex !== -1) {
			isLikedByUser = true;
		}

		if (userDislikeIndex !== -1) {
			isDislikedByUser = true;
		}

		return { isLikedByUser, isDislikedByUser };
	}

	async getPosts({ _offset, _limit, userId, _tab, _genre }) {
		if (!_tab || !["all", "my", "favorite"].includes(_tab)) {
			throw ApiError.BadRequest("Posts must have valid tab property");
		}

		let posts = [];
		let postsCount = null;
		let user = null;
		let genre = null;

		if (_genre) {
			genre = await GenreModel.findOne({ value: _genre });
			if (!genre) throw ApiError.BadRequest("Incorrect genre value");
		}

		if (_tab !== "all") {
			const user = await UserModel.findById(userId);
			const tabFilterArray = _tab === "favorite" ? user.favoritePosts : user.createdPosts;

			if (tabFilterArray && tabFilterArray.length) {
				if (genre) {
					posts = await PostModel.find({ _id: { $in: tabFilterArray }, genre: genre.value }, null, {
						skip: _offset,
						limit: _limit,
					}).sort({
						creationDate: 1,
					});

					postsCount = await PostModel.countDocuments({ _id: { $in: tabFilterArray }, genre: genre.value });
				}

				if (!genre) {
					posts = await PostModel.find({ _id: { $in: tabFilterArray } }, null, {
						skip: _offset,
						limit: _limit,
					}).sort({
						creationDate: 1,
					});
					postsCount = await PostModel.countDocuments({ _id: { $in: tabFilterArray } });
				}
			} else {
				posts = [];
				postsCount = 0;
			}
		}

		if (_tab === "all") {
			if (genre) {
				posts = await PostModel.find({ genre: genre.value }, null, {
					skip: _offset,
					limit: _limit,
				}).sort({
					creationDate: 1,
				});

				postsCount = await PostModel.countDocuments({ genre: genre.value });
			}

			if (!genre) {
				posts = await PostModel.find(null, null, {
					skip: _offset,
					limit: _limit,
				}).sort({
					creationDate: 1,
				});
				postsCount = await PostModel.estimatedDocumentCount();
			}
		}

		const postsDto = await Promise.all(
			posts.map(async post => {
				const { isDislikedByUser, isLikedByUser } = await this.checkUserReaction(post._id, userId, user);
				const postDtoItem = new PostDto({ model: post, isLikedByUser, isDislikedByUser });
				return postDtoItem;
			})
		);

		return { posts: postsDto, count: postsCount };
	}

	async getPost(id) {
		const post = await PostModel.findById(id);
		const postDto = new PostDto({ model: post });
		return postDto;
	}

	async deletePost(id) {
		const deletedPost = await PostModel.findByIdAndDelete(id);
		return deletedPost;
	}

	async addPost(postData, file, userId) {
		const user = await UserModel.findById(userId);
		const newPostGenre = await GenreModel.findOne({ value: postData.genre });
		const imageLink = await ImageService.uploadFile(file);

		const newPost = await PostModel.create({
			title: postData.title,
			description: postData.description,
			body: postData.body,
			imageUrl: imageLink,
			creationDate: postData.creationDate,
			genre: newPostGenre.value,
			likes: [],
			dislikes: [],
			createdById: user._id,
			createdByName: user.username,
		});

		user.createdPosts.push(newPost._id);
		await user.save();

		const newPostDto = new PostDto({ model: newPost });
		await fs.unlink(file.path);
		return newPostDto;
	}

	async updatePost(id, postData) {
		const result = await PostModel.findByIdAndUpdate(id, postData);
		return result;
	}

	async likePost(postId, userId) {
		const post = await PostModel.findById(postId);
		const user = await UserModel.findById(userId);

		if (!post || !user) {
			throw ApiError.BadRequest("Post or user doesn't exist");
		}
		const userLikeIndex = post.likes.findIndex(userLikedId => userLikedId.equals(user._id));
		const userDislikeIndex = post.dislikes.findIndex(userDislikedId => userDislikedId.equals(user._id));

		let isDislikedByUser = false;
		let isLikedByUser = false;

		if (userLikeIndex === -1) {
			post.likes.push(user._id);
			isLikedByUser = true;
		} else {
			post.likes.splice(userLikeIndex, 1);
		}

		if (userDislikeIndex !== -1) {
			post.dislikes.splice(userDislikeIndex, 1);
		}

		const updatedPost = await post.save();
		const updatedPostDto = new PostDto({ model: updatedPost, isLikedByUser, isDislikedByUser });

		return updatedPostDto;
	}

	async dislikePost(postId, userId) {
		const post = await PostModel.findById(postId);
		const user = await UserModel.findById(userId);

		if (!post || !user) {
			throw ApiError.BadRequest("Post or user doesn't exist");
		}
		const userLikeIndex = post.likes.findIndex(userLikedId => userLikedId.equals(user._id));
		const userDislikeIndex = post.dislikes.findIndex(userDislikedId => userDislikedId.equals(user._id));

		let isDislikedByUser = false;
		let isLikedByUser = false;

		if (userDislikeIndex === -1) {
			post.dislikes.push(user._id);
			isDislikedByUser = true;
		} else {
			post.dislikes.splice(userDislikeIndex, 1);
		}

		if (userLikeIndex !== -1) {
			post.likes.splice(userLikeIndex, 1);
		}

		const updatedPost = await post.save();
		const updatedPostDto = new PostDto({ model: updatedPost, isLikedByUser, isDislikedByUser });

		return updatedPostDto;
	}

	async setPostFavorite(postId, userId) {
		const postFromDb = await PostModel.findById(postId);
		const userFromDb = await UserModel.findById(userId);

		if (!postFromDb || !userFromDb) {
			throw ApiError.BadRequest("Post or user doesn't exist");
		}
		const postIndex = userFromDb.favoritePosts.findIndex(favoritePostId => favoritePostId.equals(postFromDb._id));

		if (postIndex === -1) {
			userFromDb.favoritePosts.push(postFromDb._id);
		} else {
			userFromDb.favoritePosts.splice(postIndex, 1);
		}

		const updatedUser = await userFromDb.save();
		const updatedUserDto = new UserDto(updatedUser);

		return updatedUserDto;
	}
}

module.exports = new PostService();
