import React from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Box } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const PostCard = ({ post }) => {
	return (
		<Card elevation={5} sx={{ maxWidth: 600, margin: "1rem auto", borderRadius: 3, boxShadow: 5, mx: "1.5rem" }}>
			<CardHeader
				sx={{ mb: "-1rem" }}
				avatar={<Avatar src={post.user.avatar} />}
				action={
					<IconButton>
						<MoreHorizIcon />
					</IconButton>
				}
				title={post.user.name}
				subheader={post.time}
			/>

			<CardContent>
				<Typography variant='body1'>{post.content}</Typography>
			</CardContent>

			<CardMedia component='img' image={post.image} alt='Imagen de publicación' sx={{ maxHeight: 500, objectFit: "cover" }} />

			<Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between" }}>
				<Typography variant='body2' color='text.secondary'>
					👍 {post.likes} Me gusta
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{post.comments} comentarios
				</Typography>
			</Box>

			<CardActions disableSpacing sx={{ borderTop: "1px solid #eee", justifyContent: "space-around" }}>
				<IconButton>
					<ThumbUpAltOutlinedIcon />
					<Typography sx={{ ml: 1 }}>Me gusta</Typography>
				</IconButton>
				<IconButton>
					<ChatBubbleOutlineIcon />
					<Typography sx={{ ml: 1 }}>Comentar</Typography>
				</IconButton>
				<IconButton>
					<ShareOutlinedIcon />
					<Typography sx={{ ml: 1 }}>Compartir</Typography>
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default PostCard;
