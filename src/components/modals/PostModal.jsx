import { useState } from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const PostModal = ({ post, onClose }) => {
	const [expanded, setExpanded] = useState(false);

	if (!post) return null;

	return (
		<>
			{/* Modal principal */}
			<Dialog
				open={Boolean(post)}
				onClose={onClose}
				maxWidth='lg'
				fullWidth
				PaperProps={{
					sx: { display: "flex", flexDirection: "row", height: "95vh", borderRadius: 3 },
				}}
			>
				<IconButton
					onClick={() => {
						window.history.replaceState(null, "", "/home");
						onClose(); // 1. Cierra el modal
					}}
					sx={{ position: "absolute", top: 10, right: 10, color: "black", zIndex: 10 }}
				>
					<CloseIcon sx={{ fontSize: "2rem" }} />
				</IconButton>

				<Box
					sx={{
						flex: 2,
						borderRadius: "12px 0 0 12px",
						bgcolor: "black",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
					}}
				>
					<img src={post.media_url} alt='Post' style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "12px 0 0 12px" }} />
					<IconButton
						onClick={() => setExpanded(true)}
						sx={{
							position: "absolute",
							top: 8,
							right: 8,
							color: "white",
							bgcolor: "rgba(0,0,0,0.5)",
							"&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
						}}
						aria-label='Expandir a pantalla completa'
					>
						<FullscreenIcon sx={{ fontSize: "2rem" }} />
					</IconButton>
				</Box>

				{/* Panel derecho */}
				<Box
					sx={{
						flex: 1,
						bgcolor: "#f5f5f5",
						p: 3,
						overflowY: "auto",
						borderRadius: "0 12px 12px 0",
					}}
				>
					<Typography variant='h6' mb={2}>
						Comentarios ({post.comments?.length || 0})
					</Typography>
					{post.comments?.map((comment) => (
						<Box key={comment.id} mb={1} p={1} bgcolor='white' borderRadius={2}>
							<Typography variant='subtitle2' fontWeight='bold'>
								{comment.user?.full_name}
							</Typography>
							<Typography variant='body2'>{comment.content}</Typography>
						</Box>
					))}

					<Typography variant='h6' mt={3} mb={2}>
						Likes ({post.likesCount || post.likes?.length || 0})
					</Typography>
					{post.likes?.map((like) => (
						<Typography key={like.id} variant='body2' mb={0.5}>
							👍 {like.user?.full_name}
						</Typography>
					))}
				</Box>
			</Dialog>

			{/* Modal para imagen expandida full screen */}
			<Dialog
				open={expanded}
				onClose={() => setExpanded(false)}
				fullScreen
				PaperProps={{
					sx: { bgcolor: "black", display: "flex", justifyContent: "center", alignItems: "center" },
				}}
			>
				<IconButton onClick={() => setExpanded(false)} sx={{ position: "absolute", top: 16, right: 16, color: "white", zIndex: 10 }} aria-label='Cerrar vista completa'>
					<CloseIcon fontSize='large' />
				</IconButton>

				<img src={post.media_url} alt='Post expandido' style={{ maxHeight: "100%", maxWidth: "100%" }} />
			</Dialog>
		</>
	);
};

export default PostModal;
