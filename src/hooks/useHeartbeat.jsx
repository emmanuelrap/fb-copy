import { useEffect } from "react";
import axios from "axios";

export const useUserPing = (userId) => {
	useEffect(() => {
		if (!userId) return;

		const sendPing = () => {
			axios
				.post("http://localhost:5000/api/users/ping", { userId })
				.then(() => console.log("Ping enviado"))
				.catch((err) => console.error("Error enviando ping:", err));
		};

		sendPing(); // manda el ping al montar

		const interval = setInterval(sendPing, 60 * 1000); // cada 1 min

		return () => clearInterval(interval); // limpia cuando desmonta
	}, [userId]);
};
