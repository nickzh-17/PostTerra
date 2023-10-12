// DTO - data transfer object
module.exports = class PostDto {
	title;
	id;
	description;
	body;
	imageUrl;
	likes;
	dislikes;
	favorite;
	date;

	constructor({ model, isLikedByUser = false, isDislikedByUser = false }) {
		this.id = model._id;
		this.title = model.title;
		this.description = model.description;
		this.body = model.body;
		this.imageUrl = model.imageUrl;
		this.likes = model.likes.length;
		this.dislikes = model.dislikes.length;
		this.favorite = model.favorite;
		this.isLikedByUser = isLikedByUser;
		this.isDislikedByUser = isDislikedByUser;
		this.creationDate = model.creationDate;
		this.createdBy = model.createdBy;
		this.createdById = model.createdById;
		this.createdByName = model.createdByName;
		this.genre = model.genre;
	}
};
