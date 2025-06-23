import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Typography, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const itemsDefault = [
	{
		image: "/statics/images/avatars/perfil.jpg",
		text: "Carlos Zambrano",
		hasStatus: true,
		isOnline: true,
		lastConnection: "Hace 2 min",
		lastConnectionDate: new Date(Date.now() - 2 * 60 * 1000), // para ordenar
		note: "Saquen plan",
	},
	{
		image: "/statics/images/avatars/perfil.jpg",
		text: "María Pérez",
		hasStatus: false,
		isOnline: true,
		lastConnection: "Hace 10 min",
		lastConnectionDate: new Date(Date.now() - 10 * 60 * 1000),
		note: "La vida no es como la pintan",
	},
	{
		image: "/statics/images/avatars/perfil.jpg",
		text: "Juan López",
		hasStatus: true,
		isOnline: false,
		lastConnection: "Hace 1 hora",
		lastConnectionDate: new Date(Date.now() - 60 * 60 * 1000),
		note: "Que ganas de un sushi",
	},
	{
		image: "/statics/images/avatars/perfil.jpg",
		text: "Ana Gómez",
		hasStatus: false,
		isOnline: false,
		lastConnection: "Hace 3 horas",
		lastConnectionDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
		note: "u______u",
	},
];

// Función para ordenar
const ordenarUsuarios = (a, b) => {
	if (a.isOnline && !b.isOnline) return -1;
	if (!a.isOnline && b.isOnline) return 1;
	return b.lastConnectionDate.getTime() - a.lastConnectionDate.getTime();
};

// Función para obtener hace cuanto se conecto
const getTimeAgo = (date) => {
	const now = new Date();
	const diffMs = now - date;
	const diffMins = Math.floor(diffMs / (1000 * 60));
	if (diffMins < 60) return `${diffMins}m`;
	const diffHours = Math.floor(diffMins / 60);
	return `${diffHours}h`;
};

const ChatList = () => {
	// Ordenar la lista antes de renderizar
	const sortedItems = [...itemsDefault].sort(ordenarUsuarios);

	return (
		<Box
			sx={{
				position: "sticky",
				top: "4rem",
				right: 0,
				width: "100%",
				height: "100vh",
			}}
		>
			<nav aria-label='default items list'>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mx: "1rem",
					}}
				>
					<Typography sx={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Contactos</Typography>
					<Box>
						<IconButton onClick={() => console.log("Buscando...")}>
							<SearchIcon />
						</IconButton>
						<IconButton onClick={() => console.log("Más opciones...")}>
							<MoreHorizIcon />
						</IconButton>
					</Box>
				</Box>

				<List>
					{sortedItems.map((i) => {
						return (
							<ListItem disablePadding key={i.text} sx={{ my: "-0.75rem" }}>
								<ListItemButton>
									<>
										<ListItemIcon>
											<Box
												sx={{
													position: "relative",
													display: "inline-block",
													borderRadius: "50%",
													...(i.hasStatus && {
														border: "2.5px solid #1877f2", // contorno azul tipo FB
														padding: "2px",
													}),
												}}
											>
												{/* SI NO TIENE ESTADO HACER MAS GRANDE LA IMAGEN */}
												{i.hasStatus ? (
													<Avatar src={i.image} alt={i.text} sx={{ width: 32, height: 32, display: "block" }} />
												) : (
													<Avatar src={i.image} alt={i.text} sx={{ mx: "3px", width: 38, height: 38, display: "block" }} />
												)}

												{/* SI ESTA ONLINE POONER PUNTITO */}
												{i.isOnline ? (
													<Box
														sx={{
															position: "absolute",
															bottom: 0,
															right: 0,
															width: 10,
															height: 10,
															backgroundColor: "#4CAF50",
															borderRadius: "50%",
															border: "2px solid white",
														}}
													/>
												) : (
													// SI ESTÁ OFFLINE: etiqueta con última conexión
													<Box
														sx={{
															position: "absolute",
															bottom: -4,
															right: -4,
															backgroundColor: "#eee",
															borderRadius: "6px",
															padding: "0 4px",
															fontSize: "10px",
															color: "#555",
															border: "1px solid #ccc",
														}}
													>
														{getTimeAgo(i.lastConnectionDate)}
													</Box>
												)}
											</Box>
										</ListItemIcon>
										<ListItemText
											primary={i.text}
											secondary={i.note}
											slotProps={{
												primary: {
													sx: { ml: "-0.25rem", fontWeight: "bold", fontSize: "1rem" },
												},
												secondary: {
													sx: { ml: "-0.25rem", fontSize: "0.75rem", color: "#777", mt: -0.25 },
												},
											}}
										/>
									</>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</nav>
		</Box>
	);
};

export default ChatList;
