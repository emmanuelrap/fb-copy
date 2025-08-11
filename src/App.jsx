import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ModalManager from "./components/modals/ModalManager";
import AppRoutes from "./routes/AppRoutes";
import { fetchUsers } from "./redux/slices/userSlice";
import { useUserPing } from "./hooks/useHeartbeat";
import { fetchNotifications } from "./redux/slices/notificationsSlice";

function App() {
	const dispatch = useDispatch();
	const reloadUsers = useSelector((state) => state.app.reloadUsers);
	const [user, setUser] = useState(() => {
		return JSON.parse(localStorage.getItem("user") || "{}");
	});

	//obtener usuarios para el chat
	useEffect(() => {
		dispatch(fetchUsers());
		if (user) dispatch(fetchNotifications(user.id));
		setUser(JSON.parse(localStorage.getItem("user") || "{}"));
	}, [reloadUsers]);

	// Escuchar cambios en localStorage
	useEffect(() => {
		const onStorageChange = () => {
			const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
			setUser(updatedUser);
		};

		window.addEventListener("storage", onStorageChange);
		return () => window.removeEventListener("storage", onStorageChange);
	}, []);

	useUserPing(user);

	return (
		<div style={{ width: "100%" }}>
			<AppRoutes />
		</div>
	);
}

export default App;
