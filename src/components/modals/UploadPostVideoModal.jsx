import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Avatar, Box, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { createPost } from "../../services/postsService";
import { uploadVideoToCloudinary } from "../../services/uploadFile"; // <== usa otro para video
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 16,
		padding: theme.spacing(1.5),
	},
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

export default function UploadVideoModal({ onClose }) {
	const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
	const [postText, setPostText] = React.useState("");
	const [video, setVideo] = React.useState(null); // preview local
	const [videoFile, setVideoFile] = React.useState(null); // archivo real
	const [errorUploadVideo, setErrorUploadVideo] = React.useState(false);

	const handleVideoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setVideo(URL.createObjectURL(file));
			setVideoFile(file);
		}
	};

	const handleCreatePost = async () => {
		setErrorUploadVideo(false);
		try {
			let mediaUrl = null;

			if (videoFile) {
				const formData = new FormData();
				formData.append("video", videoFile);

				const result = await uploadVideoToCloudinary(formData);
				mediaUrl = result.data.url;
			}

			await createPost({
				userId: JSON.parse(localStorage.getItem("user") || "{}").id,
				text_content: postText,
				media_url: mediaUrl,
				media_type: mediaUrl ? "video" : null,
			});

			Swal.fire({
				icon: "success",
				title: "Video Subido",
				text: "Tu video fue publicado correctamente.",
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});

			onClose();
		} catch (err) {
			console.error("Error al crear post:", err);
			setErrorUploadVideo(true);
		}
	};

	return (
		<BootstrapDialog onClose={onClose} aria-labelledby='customized-dialog-title' open={true} fullWidth maxWidth='xs'>
			<DialogTitle id='customized-dialog-title' sx={{ textAlign: "center", mt: -1 }}>
				<strong>Subir Video</strong>
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: "#000",
						backgroundColor: "#DDD",
						"&:hover": { backgroundColor: "#BBB" },
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Avatar src={loggedUser.avatar_url} sx={{ mr: 2, height: 50, width: 50 }} />
					<Box>
						<Typography>
							<strong>Carlos Zambrano</strong>
						</Typography>
						<Button size='small' sx={{ textTransform: "none", backgroundColor: "#EEE" }}>
							<PublicIcon sx={{ mr: 0.5 }} />
							Público
							<ArrowDropDownIcon />
						</Button>
					</Box>
				</Box>

				<TextField
					value={postText}
					onChange={(e) => setPostText(e.target.value)}
					variant='outlined'
					placeholder='¿Qué estás pensando?'
					fullWidth
					multiline
					minRows={3}
					sx={{
						mt: "1rem",
						"& .MuiOutlinedInput-root": {
							borderRadius: "16px",
							backgroundColor: "#f2f4f7",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
					}}
				/>

				{video && (
					<Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
						<video src={video} controls style={{ maxWidth: "100%", borderRadius: 8, maxHeight: 250, objectFit: "contain" }} />
					</Box>
				)}
			</DialogContent>

			{errorUploadVideo && (
				<Typography color='error' sx={{ textAlign: "center", mt: "1rem" }}>
					Hubo un error al subir tu video, intenta de nuevo.
				</Typography>
			)}

			<DialogActions sx={{ mt: "0.5rem" }}>
				{!video && (
					<Button variant='outlined' component='label' fullWidth sx={{ textTransform: "none", color: "text.secondary" }}>
						<CloudUploadIcon sx={{ mr: 1 }} />
						<strong>Subir Video</strong>
						<input type='file' accept='video/*' hidden onChange={handleVideoChange} />
					</Button>
				)}

				{video && (
					<Button sx={{ textTransform: "none", height: "3rem" }} variant='contained' fullWidth onClick={handleCreatePost} disabled={!postText.trim()}>
						<strong>Publicar</strong>
					</Button>
				)}
			</DialogActions>
		</BootstrapDialog>
	);
}
