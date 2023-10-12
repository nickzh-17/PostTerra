import { Genre } from "./tabs";

export interface Post {
	id: string | number;
	title: string;
	description: string;
	body: string;
	creationDate: string;
	createdById: string;
	createdByName: string;
	imageUrl: string;
	genre: Genre["value"];
	likes: number;
	dislikes: number;
	favorite: boolean;
	isLikedByUser: boolean;
	isDislikedByUser: boolean;
}
