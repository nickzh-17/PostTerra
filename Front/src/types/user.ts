import { Post } from "./post";

export interface User {
	_id: string | number;
	username: string;
	password: string;
	email: string;
}

export interface UserDto {
	username: string;
	email: string;
	id: User["_id"];
	isActivated: boolean;
	roles: string[];
	favoritePosts: Post["id"][];
}
