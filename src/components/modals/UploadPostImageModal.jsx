// UploadImageModal.jsx
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
import { uploadImageToCloudinary } from "../../services/uploadFile";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchPosts, resetPosts } from "../../redux/slices/postsSlice";
import { setReloadPerfilData } from "../../redux/slices/appSlice";

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

export default function UploadImageModal({ onClose, postId }) {
	const dispatch = useDispatch();
	const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
	const [postText, setPostText] = React.useState("");
	const [image, setImage] = React.useState(null); // para preview local
	const [imageFile, setImageFile] = React.useState(null); // archivo real para subir
	const [errorUploadImage, setErrorUploadImage] = React.useState(false);
	const [loading, setloading] = React.useState(false);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(URL.createObjectURL(file)); // preview
			setImageFile(file); // archivo para subir
		}
	};

	const handleCreatePost = async ({ type = "image" }) => {
		setloading(true);
		console.log("[ejecución] handleCreatePost()");
		setErrorUploadImage(false);
		try {
			let mediaUrl = null;

			if (imageFile) {
				const formData = new FormData();
				formData.append("image", imageFile);

				const result = await uploadImageToCloudinary(formData, loggedUser.id);
				mediaUrl = result.data.url;
			}

			await createPost({
				userid: JSON.parse(localStorage.getItem("user") || "{}").id,
				text_content: postText,
				media_url: mediaUrl,
				media_type: type,
			});

			Swal.fire({
				icon: "success",
				title: "Publicación Creada",
				text: "Tu imagen su subió corectamente, ahora tus amigos pueden interactuar con ella",
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			});

			//TODO Actualizar la data de los post para traer el nuevo
			dispatch(resetPosts());
			dispatch(fetchPosts({ page: 1, limit: 5 }));

			//Si lo hace desde un perfil, va a cargar la data de nuevo
			dispatch(setReloadPerfilData());

			onClose();
		} catch (err) {
			console.error("Error al crear post:", err);
			setErrorUploadImage(true);
		} finally {
			setloading(false);
		}
	};

	return (
		<BootstrapDialog
			disableEscapeKeyDown={loading}
			onClose={(event, reason) => {
				if (loading && (reason === "backdropClick" || reason === "escapeKeyDown")) {
					return; // evita cerrar
				}
				onClose();
			}}
			aria-labelledby='customized-dialog-title'
			open={true}
			fullWidth
			maxWidth='xs'
		>
			<DialogTitle id='customized-dialog-title' sx={{ textAlign: "center", mt: -1 }}>
				<strong>Crear Publicación (texto/imagen) </strong>
				<IconButton
					disabled={loading}
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
				<Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
					<Avatar sx={{ mr: 2, height: 50, width: 50 }} />
					<Box>
						<Typography>
							<strong>Carlos Zambrano</strong>
						</Typography>
						<Button
							disabled={loading}
							size='small'
							sx={{ textTransform: "none", backgroundColor: "#EEE" }}
							// Add onClick here to open visibility menu later
						>
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
					minRows={2}
					disabled={loading}
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

				{image && (
					<Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
						<img src={image} alt='Preview subida' style={{ maxWidth: "100%", borderRadius: 8, maxHeight: 250, objectFit: "contain" }} />
					</Box>
				)}
			</DialogContent>
			{errorUploadImage && (
				<Typography color='error' sx={{ textAlign: "center", mt: "1rem" }}>
					Hubo un error al crear la Publicación, intenta de nuevo
				</Typography>
			)}
			<DialogActions sx={{ mt: "0.5rem" }}>
				{!image && (
					<Button variant='outlined' component='label' fullWidth sx={{ textTransform: "none", color: "text.secondary" }}>
						<CloudUploadIcon sx={{ mr: 1 }} />
						<strong>Subir Imagen</strong>
						<input type='file' accept='image/*' hidden onChange={handleImageChange} />
					</Button>
				)}

				{image && (
					<>
						<Button
							loading={loading}
							sx={{ textTransform: "none", height: "3rem" }}
							variant='contained'
							fullWidth
							onClick={() =>
								handleCreatePost({
									type: image ? "image" : "text",
								})
							}
							disabled={!postText.trim() && !imageFile}
						>
							<strong>Publicar</strong>
						</Button>
					</>
				)}
			</DialogActions>
		</BootstrapDialog>
	);
}
