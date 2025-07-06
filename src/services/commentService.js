import axios from "axios";
import { api } from "../api";

export const createComment = async (commentData) => {
	try {
		const response = await axios.post(api.comments, commentData);
		return response.data;
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};
