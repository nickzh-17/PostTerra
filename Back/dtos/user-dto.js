// DTO - data transfer object
module.exports = class UserDto {
	username;
	email;
	id;
	isActivated;
	roles;
	favoritePosts;

	constructor(model) {
		this.username = model.username;
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
		this.roles = model.roles;
		this.favoritePosts = model.favoritePosts;
	}
};
