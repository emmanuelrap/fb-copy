import axios from "axios";
import { api } from "../api";

export const uploadImageToCloudinary = async (formData) => {
	try {
		const uploadRes = await axios.post(api.upload_image, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		return uploadRes;
	} catch {
		console.log("Error al subir imagen");
	}
};

export const uploadVideoToCloudinary = async (formData) => {
	try {
		const uploadRes = await axios.post(api.upload_video, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		return uploadRes;
	} catch {
		console.log("Error al subir video");
	}
};
