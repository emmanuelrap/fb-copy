import { useState } from "react";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { MenuItem, Typography, Box, Avatar, Chip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { io } from "socket.io-client";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import MessageIcon from "@mui/icons-material/Message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readNotification } from "../../../../services/notificationService";
import { addNotification, readNotificationRedux } from "../../../../redux/slices/notificationsSlice";

const RoundToggleButton = styled(ToggleButton)(({ theme }) => ({
	width: 40,
	height: 40,
	borderRadius: "50%",
	padding: 0,
	border: `0px solid ${theme.palette.divider}`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#e2e5e9",
	"&.Mui-selected": {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
	},
}));

export default function HorizontalToggleButtonsAccount() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { notifications } = useSelector((state) => state.notifications);
	const [selected, setSelected] = useState("");
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	React.useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		if (!user.id) return;

		const socket = io(import.meta.env.VITE_SOCKET_URL, {
			query: { userid: user.id },
		});

		socket.emit("join", user.id);
		socket.on("notification", (data) => {
			//agrega las nuevas notificaciones a las existentes
			dispatch(addNotification(data));
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleOpenNotifications = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSelected("");
	};

	const handleClick = (value) => {
		setSelected((prev) => (prev === value ? "" : value));
	};

	const handleReadNotification = ({ id, url }) => {
		console.log("handleReadNotification");
		//cambiar a leido en la bd y en Redux
		dispatch(readNotificationRedux(id));
		readNotification(id);
		navigate(url);
	};
	return (
		<div style={{ display: "flex", gap: "0.5rem" }}>
			<RoundToggleButton selected={selected === "1"} onChange={() => handleClick("1")}>
				<MessageIcon />
			</RoundToggleButton>

			<>
				<Tooltip title='Notificaciones'>
					<RoundToggleButton
						selected={selected === "2"}
						onChange={() => handleClick("2")}
						onClick={handleOpenNotifications}
						size='small'
						sx={{ ml: 1 }}
						aria-controls={open ? "notification-menu" : undefined}
						aria-haspopup='true'
						aria-expanded={open ? "true" : undefined}
					>
						<Badge badgeContent={notifications.filter((notif) => notif.is_read === false).length} color='error'>
							<NotificationsIcon />
						</Badge>
					</RoundToggleButton>
				</Tooltip>
				<Menu
					disableScrollLock
					anchorEl={anchorEl}
					id='notification-menu'
					open={open}
					onClose={handleClose}
					PaperProps={{
						style: {
							maxHeight: 50 * 4.5,
							width: "400px",
							borderRadius: 8,
						},
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<Typography variant='h5' sx={{ ml: "1rem" }}>
						<strong>Notificaciones</strong>
					</Typography>
					{notifications.length === 0 && <MenuItem disabled>No tienes notificaciones</MenuItem>}
					{notifications.map((notif, idx) => (
						<MenuItem
							onClick={() => handleReadNotification({ id: notif.id, url: notif.url })}
							key={idx}
							sx={{
								whiteSpace: "normal", // Permite que el texto haga wrap y no se quede en una sola línea
								wordBreak: "break-word", // Si hay palabras muy largas, se rompen
								lineHeight: 1.3, // para un buen espacio entre líneas
							}}
						>
							{notif.type == "LIKE" && (
								<>
									<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
										<Avatar src={notif.avatar_url} />
										<Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
											<Typography sx={{ fontWeight: "bold", mr: 0.5 }}>
												{notif.owner_fullname} {!notif.is_read && <Chip label='Nueva' color='primary' size='small' />}{" "}
											</Typography>

											<Typography>le dio like a una publicación tuya</Typography>
										</Box>
									</Box>
								</>
							)}
						</MenuItem>
					))}
				</Menu>
			</>
		</div>
	);
}
