import { useEffect } from "react";
import axios from "axios";

export const useUserPing = (userid) => {
	useEffect(() => {
		if (!userid) return;

		const sendPing = () => {
			axios
				.post("http://localhost:5000/api/users/ping", { userid })
				.then(() => console.log("Ping enviado"))
				.catch((err) => console.error("Error enviando ping:", err));
		};

		sendPing(); // manda el ping al montar

		const interval = setInterval(sendPing, 60 * 1000); // cada 1 min

		return () => clearInterval(interval); // limpia cuando desmonta
	}, [userid]);
};
