// src/services/userService.js

import axios from "axios";
import { api } from "../api";

export const getUsers = async () => {
	try {
		const response = await axios.get(api.users);
		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

export const getUserProfile = async (idUser) => {
	console.log("getUserProfile()", idUser);
	try {
		const response = await axios.get(`${api.users}/${idUser}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching user profile:", error);
		throw error;
	}
};

export const createUser = async (userData) => {
	try {
		const response = await axios.post(api.users, userData);
		return response.data;
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};

export const authUser = async (userData) => {
	try {
		const response = await axios.post(`${api.users}/login`, userData);
		return response.data;
	} catch (error) {
		console.error("Error authenticating user:", error);
		throw error;
	}
};

export const logoutUser = async (userData) => {
	try {
		const response = await axios.post(`${api.users}/logout`, userData);
		return response.data;
	} catch (error) {
		console.error("Error authenticating user:", error);
		throw error;
	}
};

export const deleteUser = async (id) => {
	console.log("userData", id);

	try {
		const response = await axios.delete(`${api.users}/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
};
