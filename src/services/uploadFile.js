import axios from "axios";
import imageCompression from "browser-image-compression";

import { api } from "../api";

export const uploadImageToCloudinary = async (formData, idUser) => {
	console.log("[ejecución] uploadImageToCloudinary()");
	try {
		const imageFile = formData.get("image");

		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 1024,
			useWebWorker: true,
		};

		const compressedFile = await imageCompression(imageFile, options);

		formData.set("image", compressedFile, compressedFile.name);

		const uploadRes = await axios.post(`${api.upload_image}/${idUser}`, formData);

		return uploadRes;
	} catch (error) {
		console.error("Error al subir imagen:", error);
		throw error;
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
