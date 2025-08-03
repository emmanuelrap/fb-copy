import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import BlockIcon from "@mui/icons-material/Block";
import { delay } from "../../../../../helpers/delay";

export default function MenuComment({ isMine, onDelete, onUpdate, comment, setUpdateCommentContent }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [disabled, setDisabled] = React.useState(false);

	const handleClickMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleUpdateComment = async () => {
		setUpdateCommentContent(comment.content);
		if (onUpdate) onUpdate();

		setDisabled(true);
		setAnchorEl(null);

		await delay(600);
		setDisabled(false);
	};

	const handleDeleteComment = () => {
		if (onDelete) onDelete();
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
						<MenuItem onClick={handleUpdateComment}>
							<ListItemIcon>
								<EditIcon sx={{ mr: "0.5rem" }} fontSize='small' />{" "}
							</ListItemIcon>
							<ListItemText>Editar</ListItemText>
						</MenuItem>
						<MenuItem onClick={handleDeleteComment}>
							<ListItemIcon>
								<DeleteIcon sx={{ mr: "0.5rem" }} fontSize='small' />
							</ListItemIcon>
							<ListItemText>Eliminar</ListItemText>
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
								<ListItemText>Reportar</ListItemText>
							</Tooltip>
						</MenuItem>
					</Box>
				)}
			</Menu>
		</div>
	);
}
