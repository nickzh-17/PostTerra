import { $api, client } from "api";
import { API_URL } from "config";
import { PostsResponse } from "types/api-types/response";
import { Post } from "types/post";
import { Tab } from "types/tabs";
import { UserDto } from "types/user";

export interface GetPostsParams {
	limit: number;
	offset: number;
	tabValue: Tab["value"];
	genreValue: Tab["value"] | null;
}

export interface GetPostParams {
	id: Post["id"];
}

export interface UpdatePostParams {
	post: Post;
	newFields: Partial<Post>;
}

export interface SetFavoriteParams {
	id: Post["id"];
	favorite: Post["favorite"];
}

class PostApi {
	async getPosts(params: GetPostsParams): Promise<PostsResponse> {
		const { limit, offset, tabValue, genreValue } = params;
		const res = await $api
			.get(`/posts?_tab=${tabValue}&_offset=${offset}&_limit=${limit}${genreValue ? `&_genre=${genreValue}` : ""}`)
			.then(res => res.data);
		return res;
	}

	async getPost(id: Post["id"]): Promise<Post> {
		const res = await client.get(`/posts/${id}`).then(res => res.data);
		return await res;
	}

	async likePost(postId: Post["id"]): Promise<Post> {
		const res = await $api.get(`/posts/like/${postId}`).then(res => res.data);
		return res;
	}

	async dislikePost(postId: Post["id"]): Promise<Post> {
		const res = await $api.get(`/posts/dislike/${postId}`).then(res => res.data);
		return res;
	}

	async toggleUserFavoritePost(postId: Post["id"]): Promise<UserDto> {
		const res = await $api.get(`/posts/favorite/${postId}`).then(res => res.data);
		return res;
	}

	async updatePost(params: UpdatePostParams) {
		const postId = params.post.id;
		const updatedPost = { ...params.post, ...params.newFields };

		const res = await fetch(`${API_URL}/posts/${postId}`, {
			method: "PATCH",
			body: JSON.stringify(updatedPost),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});

		return await res.json();
	}

	async createPost(params: FormData): Promise<Post> {
		const res = await $api.post(`/posts`, params).then(res => res.data);
		return res;
	}
}

export default new PostApi();
