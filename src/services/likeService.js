import axios from "axios";
import { api } from "../api";

export const addLikeToPost = async (likeData) => {
	try {
		const response = await axios.post(api.likes, likeData);
		return response.data;
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};
