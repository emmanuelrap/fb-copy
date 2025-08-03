// src/services/userService.js

import axios from "axios";
import { api } from "../api";

export const getUsers = async (signal) => {
	console.log("[ejecución] getUsers()");
	const response = await axios.get(api.users, { signal });
	return response.data;
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

export const updateUser = async (id, dataToUpdate) => {
	console.log("[ejecución] updateUser()", `${api.users}/${id}`);
	try {
		const response = await axios.patch(`${api.users}/${id}`, dataToUpdate);
		return response.data;
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
};
