import { useState } from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const PostModal = ({ post, onClose }) => {
	const [expanded, setExpanded] = useState(true);

	if (!post) return null;

	return (
		<>
			{/* Modal para imagen expandida full screen */}
			<Dialog
				open={Boolean(post)}
				onClose={() => {
					setExpanded(false);
				}}
				fullScreen
				PaperProps={{
					sx: { bgcolor: "black", display: "flex", justifyContent: "center", alignItems: "center" },
				}}
			>
				<IconButton
					onClick={() => {
						setExpanded(false);
						onClose();
					}}
					sx={{ position: "absolute", top: 16, right: 16, color: "white", zIndex: 10 }}
					aria-label='Cerrar vista completa'
				>
					<CloseIcon fontSize='large' />
				</IconButton>

				<img src={post.media_url} alt='Post expandido' style={{ maxHeight: "100%", maxWidth: "100%" }} />
			</Dialog>
		</>
	);
};

export default PostModal;
