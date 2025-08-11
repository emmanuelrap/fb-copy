import axios from "axios";
import { api } from "../api";

// Obtener notificaciones
export const getNotifications = async (userid) => {
	try {
		const response = await axios.get(api.notifications + "/" + userid);
		return response.data;
	} catch (error) {
		console.error("Error getNotifications :", error);
		throw error;
	}
};

export const readNotification = async (id) => {
	try {
		const response = await axios.put(api.notifications + "/" + id + "/read");

		return response.data;
	} catch (error) {
		console.error("Error readNotification  :", error);
		throw error;
	}
};
