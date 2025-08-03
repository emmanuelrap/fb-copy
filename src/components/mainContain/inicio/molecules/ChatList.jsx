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
import { useDispatch, useSelector } from "react-redux";

const ordenarUsuarios = (a, b) => {
	if (a.isOnline && !b.isOnline) return -1;
	if (!a.isOnline && b.isOnline) return 1;

	const dateA = new Date(a.lastconnection);
	const dateB = new Date(b.lastconnection);

	return dateB.getTime() - dateA.getTime();
};

const getTimeAgo = (dateString) => {
	if (!dateString) return ""; // protección si no hay fecha
	const date = new Date(dateString);
	if (isNaN(date)) return ""; // fecha inválida

	const now = new Date();
	const diffMs = now - date;
	const diffMins = Math.floor(diffMs / (1000 * 60));

	if (diffMins < 60) return `${diffMins}m`;

	const diffHours = Math.floor(diffMins / 60);
	if (diffHours < 24) return `${diffHours}h`;

	const diffDays = Math.floor(diffHours / 24);
	if (diffDays < 7) return `${diffDays}d`;

	const diffWeeks = Math.floor(diffDays / 7);
	if (diffWeeks < 4) return `${diffWeeks}sem`;

	const diffMonths = Math.floor(diffDays / 30);
	if (diffMonths < 12) return `${diffMonths}meses`;

	const diffYears = Math.floor(diffDays / 365);
	return `${diffYears}años`;
};

const ChatList = () => {
	const { users } = useSelector((state) => state.users);
	const [usersWithStatus, setUsersWithStatus] = React.useState([]);

	// Actualiza estado online basado en lastconnection
	const updateOnlineStatus = React.useCallback(() => {
		const now = Date.now();

		const updatedUsers = users.map((user) => {
			const lastConn = new Date(user.lastconnection).getTime();
			const diffSeconds = (now - lastConn) / 1000;

			const isOnline = diffSeconds < 35;

			//console.log(`👤 ${user.full_name} → Última conexión: ${user.lastconnection} | Diferencia: ${Math.floor(diffSeconds)}s | Online: ${isOnline}`);

			return {
				...user,
				isOnline,
			};
		});

		setUsersWithStatus(updatedUsers);
	}, [users]);

	React.useEffect(() => {
		updateOnlineStatus();
		const interval = setInterval(updateOnlineStatus, 30000); // cada 30 seg

		return () => clearInterval(interval);
	}, [updateOnlineStatus]);

	const sortedItems = [...usersWithStatus].sort(ordenarUsuarios);

	return (
		<Box sx={{ position: "sticky", top: "4rem", right: 0, width: "100%", height: "100vh" }}>
			<nav aria-label='default items list'>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mx: "1rem" }}>
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
					{sortedItems.map((i) => (
						<ListItem disablePadding key={i.id} sx={{ my: "-0.75rem" }}>
							<ListItemButton>
								<ListItemIcon>
									<Box
										sx={{
											position: "relative",
											display: "inline-block",
											borderRadius: "50%",
											...(i.hasStatus && {
												border: "2.5px solid #1877f2",
												padding: "2px",
											}),
										}}
									>
										{i.hasStatus ? (
											<Avatar src={i.avatar_url} sx={{ width: 32, height: 32, display: "block" }} />
										) : (
											<Avatar src={i.avatar_url} sx={{ mx: "3px", width: 38, height: 38, display: "block" }} />
										)}

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
												{getTimeAgo(i.lastconnection)}
											</Box>
										)}
									</Box>
								</ListItemIcon>
								<ListItemText
									primary={i.full_name}
									secondary={i.note}
									slotProps={{
										primary: { sx: { ml: "-0.25rem", fontWeight: "bold", fontSize: "0.9rem" } },
										secondary: { sx: { ml: "-0.25rem", fontSize: "0.75rem", color: "#777", mt: -0.25 } },
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</nav>
		</Box>
	);
};

export default ChatList;
