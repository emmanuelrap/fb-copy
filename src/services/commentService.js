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

export const updateComment = async (commentId, updatedData) => {
	try {
		const response = await axios.patch(`${api.comments}/${commentId}`, updatedData);
		return response.data;
	} catch (error) {
		console.error("Error updating comment:", error);
		throw error;
	}
};

export const deleteComment = async (commentId) => {
	try {
		const response = await axios.delete(`${api.comments}/${commentId}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting comment:", error);
		throw error;
	}
};
