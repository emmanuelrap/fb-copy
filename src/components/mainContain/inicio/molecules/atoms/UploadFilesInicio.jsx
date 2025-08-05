import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Button, Divider, Paper, TextField, Typography, Fade, Tooltip } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../redux/slices/modalSlice";
import { useIsMobile } from "../../../../../hooks/useIsMobile";

const UploadFilesInicio = () => {
	const dispatch = useDispatch();
	const isMobile = useIsMobile();
	const placeholders = ["¿Qué estás pensando?", "Escribe algo genial...", "Comparte tu opinión", "¿Qué hay de nuevo?", "Cuéntanos algo..."];
	const [placeholderIndex, setPlaceholderIndex] = useState(0);
	const [postText, setPostText] = useState("");

	const indexRef = useRef(0);
	useEffect(() => {
		const interval = setInterval(() => {
			indexRef.current = (indexRef.current + 1) % placeholders.length;
			setPlaceholderIndex(indexRef.current);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const handlePost = () => {
		console.log("Publicado:", postText);
		setPostText("");
	};

	const handleButtonCreatePostVideo = () => {
		console.log("handleButtonCreatePostVideo");
		dispatch(
			showModal({
				modalType: "UPLOAD_VIDEO",
				modalProps: {
					postId: 123, //innecesario
				},
			})
		);
	};

	const handleButtonCreatePostImage = () => {
		console.log("handleButtonCreatePostImage");
		dispatch(
			showModal({
				modalType: "UPLOAD_IMAGE",
				modalProps: {
					postId: 123, //innecesario
				},
			})
		);
	};
	const handleButtonCreatePostSentimiento = () => {};

	return (
		<Paper elevation={3} sx={{ borderRadius: isMobile ? 0 : 4, p: isMobile ? 1.5 : 2, mx: isMobile ? "0rem" : "2.5rem", mb: isMobile ? "1rem" : "2rem", mt: isMobile ? "1rem" : "2rem" }}>
			{isMobile && (
				<Typography sx={{ mb: 1 }}>
					<strong>Publicaciones</strong>
				</Typography>
			)}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					position: "relative",
				}}
			>
				<Avatar src={JSON.parse(localStorage.getItem("user") || "{}").avatar_url} sx={{ mr: 2 }} />
				<TextField
					// size='small'
					value={postText}
					onChange={(e) => setPostText(e.target.value)}
					variant='outlined'
					placeholder={placeholders[placeholderIndex]}
					fullWidth
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "32px",
							backgroundColor: "#f2f4f7",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							border: "none",
						},
					}}
				/>
				<Fade in={postText.trim() !== ""}>
					<Button
						variant='contained'
						onClick={handlePost}
						sx={{
							position: "absolute",
							right: "0.75rem",
							height: "2rem",
							px: 2,
							borderRadius: "20px",
							textTransform: "none",
							fontWeight: "bold",
							backgroundColor: "#1976d2",
							"&:hover": {
								backgroundColor: "#115293",
							},
						}}
					>
						Publicar
					</Button>
				</Fade>
			</Box>

			<Divider sx={{ my: 2 }} />

			{/* Botones de opciones */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					gap: 1.5,
				}}
			>
				<Button
					fullWidth
					variant='text'
					onClick={handleButtonCreatePostVideo}
					sx={{
						height: "3rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						textTransform: "none",
						borderRadius: 3,
						backgroundColor: "#f8f9fa",
						"&:hover": {
							backgroundColor: "#e9ecef",
						},
					}}
				>
					<VideocamIcon fontSize='medium' sx={{ color: "red" }} />
					<Typography sx={{ ml: 1, fontWeight: 500, color: "#444" }}>Video</Typography>
				</Button>

				<Button
					variant='text'
					fullWidth
					onClick={handleButtonCreatePostImage}
					sx={{
						height: "3rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						textTransform: "none",
						borderRadius: 3,
						backgroundColor: "#f8f9fa",
						"&:hover": {
							backgroundColor: "#e9ecef",
						},
					}}
				>
					<ImageIcon fontSize='medium' sx={{ color: "green" }} />
					<Typography sx={{ ml: 1, fontWeight: 500, color: "#444" }}>Foto</Typography>
				</Button>
				<Tooltip title='No está disponible por ahora' arrow>
					<span>
						<Button
							disabled
							variant='text'
							fullWidth
							onClick={handleButtonCreatePostSentimiento}
							sx={{
								height: "3rem",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								textTransform: "none",
								borderRadius: 3,
								backgroundColor: "#f8f9fa",
								"&:hover": {
									backgroundColor: "#e9ecef",
								},
							}}
						>
							<EmojiEmotionsIcon fontSize='medium' sx={{ color: "#f1c40f" }} />
							<Typography sx={{ ml: 1, fontWeight: 500, color: "#444" }}>Sentimiento</Typography>
						</Button>
					</span>{" "}
				</Tooltip>
			</Box>
		</Paper>
	);
};

export default UploadFilesInicio;
