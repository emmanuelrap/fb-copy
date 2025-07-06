import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import HorizontalToggleButtonsAccount from "./HorizontalToggleButtonsAccount";
import { useNavigate } from "react-router-dom";
import { deleteUser, logoutUser } from "../../../../services/userService";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Swal from "sweetalert2";

const AccountButtons = () => {
	const navigate = useNavigate();
	// ACTIVACION DEL MENU DE LA CUENTA ------------------------
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = async () => {
		try {
			const user = JSON.parse(localStorage.getItem("user") || "{}");
			const email = user?.email;

			if (!email) {
				console.error("No user email found for logout.");
				return;
			}

			await logoutUser({ email });
			localStorage.removeItem("user");

			navigate("/login");
		} catch (error) {
			console.error("Error during logout:", error);
			Swal.fire("Error", "No se pudo cerrar  sesion", "error");
		}

		// Cerrar el menu (aunque falle el logout en server)
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickPerfil = () => {
		navigate(`/perfil/${JSON.parse(localStorage.getItem("user") || "{}").id}`);
	};
	// -------------------------------------------------------

	const handleDeleteUser = async () => {
		const user = JSON.parse(localStorage.getItem("user") || "{}");

		const result = await Swal.fire({
			title: "¿Estás seguro?",
			text: "¡Esta acción eliminará tu cuenta permanentemente!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
		});

		if (result.isConfirmed) {
			try {
				await deleteUser(user.id);
				localStorage.removeItem("user");
				Swal.fire("¡Eliminado!", "Tu cuenta ha sido eliminada.", "success");
				navigate("/login");
			} catch (error) {
				console.error("Error al eliminar usuario:", error);
				Swal.fire("Error", "Ocurrió un error al eliminar tu cuenta.", "error");
			}
		}
	};

	return (
		<React.Fragment>
			<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
				{/* TOGGLE BUTTONS ---------------------- */}
				<HorizontalToggleButtonsAccount />
				{/*  ---------------------- */}
				<Tooltip title='Account settings'>
					<IconButton onClick={handleClick} size='small' sx={{ ml: "0.25rem" }} aria-controls={open ? "account-menu" : undefined} aria-haspopup='true' aria-expanded={open ? "true" : undefined}>
						<Avatar sx={{ width: 40, height: 40 }} alt='imagen de perfil' src={JSON.parse(localStorage.getItem("user") || "{}").avatar_url} />
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				disableScrollLock
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem onClick={handleClickPerfil}>
					<Avatar src={JSON.parse(localStorage.getItem("user") || "{}").avatar_url} /> Mi perfil
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Avatar /> Mi tienda
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<PersonAdd fontSize='small' />
					</ListItemIcon>
					Agregar otra cuenta
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					Configuración y privacidad
				</MenuItem>
				<MenuItem onClick={handleDeleteUser} sx={{ mb: -0.5 }}>
					<ListItemIcon>
						<PersonRemoveIcon fontSize='small' />
					</ListItemIcon>
					Dar de baja mi cuenta
				</MenuItem>
				<MenuItem onClick={handleLogout} sx={{ mb: -0.5 }}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Cerrar sesión
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
};

export default AccountButtons;
