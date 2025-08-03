import axios from "axios";
import { api } from "../api";

// Obtener un  post
export const getPost = async (id) => {
	try {
		const response = await axios.get(api.posts + "/one/" + id);
		return response.data;
	} catch (error) {
		console.error("Error fetching ONE post:", error);
		throw error;
	}
};

// Obtener todos los posts
export const getPosts = async () => {
	try {
		const response = await axios.get(api.posts);
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};

export const getAllPosts = async () => {
	try {
		const response = await axios.get(api.posts + "/all");
		return response.data;
	} catch (error) {
		console.error("Error fetching all posts:", error);
		throw error;
	}
};

export const getPaginatedPosts = async (page = 1, limit = 5) => {
	try {
		const response = await axios.get(`${api.posts}?page=${page}&limit=${limit}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};

// Crear un nuevo post
export const createPost = async (postData) => {
	try {
		const response = await axios.post(api.posts, postData);
		return response.data;
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};

// Eliminar un post
export const deletePost = async (postId) => {
	try {
		const response = await axios.delete(`${api.posts}/${postId}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting post:", error);
		throw error;
	}
};

// Actualizar un post
export const updatePost = async (postId, updateData) => {
	try {
		const response = await axios.put(`${api.posts}/${postId}`, updateData);
		return response.data;
	} catch (error) {
		console.error("Error updating post:", error);
		throw error;
	}
};
