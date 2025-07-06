const BASE_URL = import.meta.env.VITE_API_URL;

export const api = {
	users: `${BASE_URL}/users`,
	posts: `${BASE_URL}/posts`,
	comments: `${BASE_URL}/comments`,
	likes: `${BASE_URL}/likes`,
	friendships: `${BASE_URL}/friendships`,
	upload_image: `${BASE_URL}/upload/image`,
	upload_video: `${BASE_URL}/upload/video`,
};
