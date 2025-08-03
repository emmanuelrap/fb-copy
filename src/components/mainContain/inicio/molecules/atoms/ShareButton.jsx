import React, { useState } from "react";
import { Button, Typography, Popover, IconButton, Box, InputBase, Tooltip, Divider } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const ShareButton = ({ postUrl }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCopy = async () => {
		await navigator.clipboard.writeText(postUrl);
		handleClose();
		alert("✅ ¡Enlace copiado!");
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Button
				onClick={handleClick}
				sx={{
					flex: 1,
					textTransform: "none",
					borderRadius: 3,
					"&:hover": { backgroundColor: "#e9ecef" },
					color: "text.secondary",
				}}
			>
				<ShareOutlinedIcon />
				<Typography sx={{ ml: 1, fontWeight: "bold" }}>Compartir</Typography>
			</Button>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				PaperProps={{
					sx: {
						p: 2,
						borderRadius: 3,
						boxShadow: 5,
						width: 300,
					},
				}}
			>
				<Typography variant='subtitle1' fontWeight='bold' gutterBottom>
					Compartir publicación
				</Typography>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						backgroundColor: "#f1f1f1",
						px: 1,
						py: 0.5,
						borderRadius: 2,
						mt: 1,
					}}
				>
					<InputBase value={postUrl} fullWidth disabled sx={{ fontSize: 14 }} />
					<Tooltip title='Copiar'>
						<IconButton onClick={handleCopy} size='small'>
							<ContentCopyIcon fontSize='small' />
						</IconButton>
					</Tooltip>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Button
					variant='contained'
					fullWidth
					startIcon={<WhatsAppIcon />}
					href={`https://wa.me/?text=${encodeURIComponent(postUrl)}`}
					target='_blank'
					rel='noopener noreferrer'
					sx={{
						textTransform: "none",
						backgroundColor: "#25D366",
						"&:hover": {
							backgroundColor: "#1ebc59",
						},
						fontWeight: "bold",
					}}
				>
					Mandar por WhatsApp
				</Button>
			</Popover>
		</>
	);
};

export default ShareButton;
