import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../components/login/Login";
import MainContain from "../components/mainContain/MainContain";
import ProfilePage from "../components/mainContain/ProfilePage";
// import NotFoundPage from "../pages/NotFoundPage";

// Protege rutas privadas
const PrivateRoute = ({ children }) => {
	const isAuthenticated = !!localStorage.getItem("user"); // Puedes usar auth context o JWT aquí
	return isAuthenticated ? children : <Navigate to='/login' />;
};

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				{/* Rutas públicas */}
				<Route path='/login' element={<LoginPage />} />

				{/* Rutas privadas */}
				<Route
					path='/home'
					element={
						<PrivateRoute>
							<MainContain />
						</PrivateRoute>
					}
				/>
				<Route
					path='/home/post/:idSharedPost'
					element={
						<PrivateRoute>
							<MainContain />
						</PrivateRoute>
					}
				/>

				<Route path='/' element={<Navigate to='/home' />} />
				<Route
					path='/perfil/:idUser'
					element={
						<PrivateRoute>
							<ProfilePage />
						</PrivateRoute>
					}
				/>

				{/* 404 */}
				{/* <Route path='*' element={<NotFoundPage />} /> */}
			</Routes>
		</Router>
	);
};

export default AppRoutes;
