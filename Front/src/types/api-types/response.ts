import { Post } from "types/post";
import { Tab } from "types/tabs";
import { UserDto } from "../user";
import { RegistrationParams } from "./request";

export interface PostsResponse {
	count: number;
	posts: Post[];
}

export type ErrorResponse = {
	message: string;
	errors: string[];
};

export interface LoginSuccessResponse {
	accessToken: string;
	user: UserDto;
}

export type LoginResponse = ErrorResponse | LoginSuccessResponse;

export type RegistrationFieldError = {
	value: string;
	msg: string;
	path: keyof RegistrationParams;
};

export interface RegistrationErrorResponse {
	message: string;
	errors: RegistrationFieldError[];
}

export interface RegistrationSuccessResponse {
	message: string;
}

export type RegistrationResponse = RegistrationSuccessResponse | RegistrationErrorResponse;

export interface GenresResponse {
	genres: Tab[];
}
