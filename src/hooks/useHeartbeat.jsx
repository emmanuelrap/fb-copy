//Hace un ping cada 30 segundos indicando que sigue conectado (agrega la hora actual a la bd en lastconnection) y trae los usuarios actualizados
import { useEffect } from "react";
import axios from "axios";
import { fetchUsers } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

export const useUserPing = (user) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user.id) return;

		const sendPing = () => {
			//actualizar usuarios
			dispatch(fetchUsers());
			//mandar ping
			axios
				.post("http://localhost:5000/api/users/ping", { userid: user.id, lastconnection: new Date().toISOString() })
				.then(() => {
					console.log(`(ping) El usuario ${user.full_name} continua conectado`);
				})
				.catch((err) => console.error("Error enviando ping:", err));
		};

		sendPing(); // manda el ping al montar

		const interval = setInterval(sendPing, 60 * 500); // cada 30 seg

		return () => clearInterval(interval); // limpia cuando desmonta
	}, [user.id]);
};
