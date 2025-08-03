import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import BlockIcon from "@mui/icons-material/Block";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

export default function MenuPost({ isMine, onDelete }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [disabled, setDisabled] = React.useState(false);

	const handleClickMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleDeletePost = () => {
		if (onDelete) {
			onDelete();
		}
		setDisabled(true);
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton onClick={handleClickMenu} disabled={disabled}>
				<MoreHorizIcon />
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
				{isMine ? (
					<Box>
						{/* <MenuItem onClick={handleCloseMenu}>
							<ListItemIcon>
								<EditIcon sx={{ mr: "0.5rem" }} fontSize='small' />{" "}
							</ListItemIcon>
							<ListItemText>Editar publicacion</ListItemText>
						</MenuItem> */}
						<MenuItem onClick={handleDeletePost}>
							<ListItemIcon>
								<DeleteIcon sx={{ mr: "0.5rem" }} fontSize='small' />
							</ListItemIcon>
							<ListItemText>Eliminar publicación</ListItemText>
						</MenuItem>

						<MenuItem onClick={handleCloseMenu}>
							<ListItemIcon>
								<VisibilityOffIcon sx={{ mr: "0.5rem" }} fontSize='small' />
							</ListItemIcon>
							<Tooltip title='No disponible aún'>
								<ListItemText>Archivar publicación</ListItemText>
							</Tooltip>
						</MenuItem>
						<MenuItem onClick={handleCloseMenu}>
							<ListItemIcon>
								<NotificationsOffIcon sx={{ mr: "0.5rem" }} fontSize='small' />
							</ListItemIcon>
							<Tooltip title='No disponible aún'>
								<ListItemText>Desactivar notificaciones</ListItemText>{" "}
							</Tooltip>
						</MenuItem>
					</Box>
				) : (
					<Box>
						<MenuItem onClick={handleCloseMenu}>
							<ListItemIcon>
								<BlockIcon sx={{ mr: "0.5rem" }} fontSize='small' />
							</ListItemIcon>
							<Tooltip title='No disponible aún'>
								<ListItemText>Bloquear usuario</ListItemText>
							</Tooltip>
						</MenuItem>

						<MenuItem onClick={handleCloseMenu}>
							<ListItemIcon>
								<ReportIcon sx={{ mr: "0.5rem" }} fontSize='small' />{" "}
							</ListItemIcon>
							<Tooltip title='No disponible aún'>
								<ListItemText>Reportar publicación</ListItemText>
							</Tooltip>
						</MenuItem>
					</Box>
				)}
			</Menu>
		</div>
	);
}
