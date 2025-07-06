import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import ModalManager from "./components/modals/ModalManager";
import AppRoutes from "./routes/AppRoutes";
import { fetchUsers } from "./redux/slices/userSlice";
import { useUserPing } from "./hooks/useHeartbeat";

const user = JSON.parse(localStorage.getItem("user") || "{}");

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useUserPing(user?.id);

	return (
		<>
			<AppRoutes />
			<ModalManager />
		</>
	);
}

export default App;
