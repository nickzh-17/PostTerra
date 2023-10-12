import { Post } from "types/post";
import { User } from "types/user";

export interface LoginParams {
	username: User["username"];
	password: User["password"];
}

export interface RegistrationParams {
	username: User["username"];
	email: User["email"];
	password: User["password"];
}

export interface GetUserParams {
	username: User["username"];
}

export type CreatePostParams = Pick<Post, "title" | "description" | "body" | "creationDate" | "imageUrl" | "genre"> & {
	image: Blob;
	// image: string;
};
