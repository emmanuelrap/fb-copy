import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Avatar,
	IconButton,
	Typography,
	Box,
	TextField,
	Button,
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useDispatch } from "react-redux";
import { addComment, addLike } from "../../../../../redux/slices/postsSlice";
import Swal from "sweetalert2";

const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [comment, setComment] = useState("");
	const [commenting, setCommenting] = useState(false);
	const [liked, setLiked] = useState(false);
	const [liking, setLiking] = useState(false);
	const [animateLike, setAnimateLike] = useState(false);
	const [likesModalOpen, setLikesModalOpen] = useState(false);

	useEffect(() => {
		if (post.likes?.some((like) => like.userid === loggedUser.id)) setLiked(true);
	}, []);

	const handleToggleComment = () => setShowCommentBox((prev) => !prev);

	const handleCommentSubmit = () => {
		if (!comment.trim()) return;
		setCommenting(true);

		dispatch(
			addComment({
				postid: post.id,
				userid: loggedUser?.id,
				content: comment,
				media_url: null,
			})
		)
			.unwrap()
			.catch((error) => {
				Swal.fire("Error", error || "No se pudo agregar comentario", "error");
			});
		setComment("");
		setCommenting(false);
	};
	const handleLikeClick = () => {
		if (liking) return;
		setLiking(true);

		const JSON = { postid: post.id, userid: loggedUser.id };
		console.log("JSON like ->", JSON);

		dispatch(addLike(JSON))
			.unwrap()
			.then(({ like }) => {
				setLiked(!!like); // si hay objeto like -> true, si null -> false
			})
			.catch((error) => {
				Swal.fire("Error", error || "No se pudo cambiar el like", "error");
			})
			.finally(() => setLiking(false));
	};

	useEffect(() => {
		if (liked) {
			setAnimateLike(true);
			setTimeout(() => setAnimateLike(false), 200);
		}
	}, [liked]);

	const handleOpenLikes = () => setLikesModalOpen(true);
	const handleCloseLikes = () => setLikesModalOpen(false);

	return (
		<>
			<Card sx={{ margin: "1rem auto", borderRadius: 5, boxShadow: 5, mx: "1.5rem" }}>
				<CardHeader
					sx={{ mb: "-1rem" }}
					avatar={<Avatar src={post.user?.avatar_url || ""} />}
					action={
						<IconButton>
							<MoreHorizIcon />
						</IconButton>
					}
					title={
						<Typography fontWeight='bold'>
							{post.user?.full_name} {post?.user?.id === loggedUser?.id && " (Yo) "}
						</Typography>
					}
					subheader={new Date(post.created_at).toLocaleString()}
				/>

				<CardContent>
					<Typography variant='body1'>{post.text_content}</Typography>
				</CardContent>

				{/* Imágenes */}
				{post.media_url && post.media_type === "image" && <CardMedia component='img' image={post.media_url} alt='Imagen' sx={{ maxHeight: 500, objectFit: "cover" }} />}

				{/* Videos */}
				{post.media_url && post.media_type === "video" && (
					<Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
						<video src={post.media_url} controls style={{ maxWidth: "100%", borderRadius: "12px" }} />
					</Box>
				)}

				<Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between" }}>
					<Typography variant='body2' color='text.secondary' sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }} onClick={handleOpenLikes}>
						👍 {post.likesCount || 0} Me gusta
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{post.comments?.length > 1 ? `${post.comments.length} comentarios` : post.comments?.length === 1 ? "1 comentario" : "Aún no hay comentarios"}
					</Typography>
				</Box>

				<CardActions disableSpacing sx={{ borderTop: "1px solid #eee", justifyContent: "space-around" }}>
					<Button
						onClick={handleLikeClick}
						variant='text'
						fullWidth
						sx={{
							flex: 1,
							textTransform: "none",
							borderRadius: 3,
							"&:hover": { backgroundColor: "#e9ecef" },
							color: "text.secondary",
						}}
					>
						<ThumbUpAltOutlinedIcon
							sx={{
								color: liked ? "primary.main" : "inherit",
								transition: "transform 0.25s ease",
								transform: animateLike ? "scale(1.5) rotate(-10deg)" : "scale(1) rotate(0deg)",
							}}
						/>
						<Typography sx={{ ml: 1, fontWeight: "bold" }} variant='body1' color={liked ? "primary.main" : "inherit"}>
							Me gusta
						</Typography>
					</Button>

					<Button
						onClick={handleToggleComment}
						sx={{
							flex: 1,
							textTransform: "none",
							borderRadius: 3,
							"&:hover": { backgroundColor: "#e9ecef" },
							color: "text.secondary",
						}}
					>
						<ChatBubbleOutlineIcon />
						<Typography sx={{ ml: 1, fontWeight: "bold" }}>Comentar</Typography>
					</Button>

					<Tooltip title='No está disponible por ahora' arrow>
						<span>
							<Button
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
						</span>
					</Tooltip>
				</CardActions>

				{/* Comentarios */}
				{showCommentBox && (
					<>
						{post.commentsCount > 0 && <Divider />}
						{post.comments?.map((comment) => (
							<Box key={comment.id} sx={{ display: "flex", alignItems: "flex-start", m: 1 }}>
								<Avatar src={comment.user?.avatar_url || loggedUser.avatar_url} sx={{ mr: 1.5 }} />
								<Box sx={{ backgroundColor: "#f0f2f5", borderRadius: 5, p: 1.5, maxWidth: "80%" }}>
									<Typography variant='subtitle2' sx={{ fontWeight: 600, mt: -1 }}>
										{comment.user?.full_name || loggedUser.full_name}
									</Typography>
									<Typography sx={{ mb: -1 }} variant='body2'>
										{comment.content}
									</Typography>
								</Box>
							</Box>
						))}
						<Divider />
						<Box sx={{ px: 2, py: 2, borderTop: "1px solid #eee" }}>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Avatar src={loggedUser?.avatar_url || ""} sx={{ mr: "0.5rem" }} />
								<TextField fullWidth multiline rows={2} placeholder='Escribe un comentario...' value={comment} onChange={(e) => setComment(e.target.value)} disabled={commenting} />
							</Box>
							<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
								<Button variant='contained' onClick={handleCommentSubmit} disabled={!comment.trim() || commenting}>
									{commenting ? "Comentando..." : "Comentar"}
								</Button>
							</Box>
						</Box>
					</>
				)}
			</Card>

			{/* Modal de Likes */}
			<Dialog
				open={likesModalOpen}
				onClose={handleCloseLikes}
				fullWidth
				maxWidth='xs'
				sx={{
					"& .MuiPaper-root": { borderRadius: 3 },
				}}
			>
				<DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>Personas a las que les gusta</DialogTitle>
				<DialogContent>
					<List>
						{post.likes?.map((like) => (
							<ListItem key={like.id}>
								<ListItemAvatar>
									<Avatar src={like.user?.avatar_url || ""} />
								</ListItemAvatar>
								<ListItemText primary={like?.full_name} secondary={new Date(like.created_at).toLocaleString()} />
							</ListItem>
						))}
						{(!post.likes || post.likes.length === 0) && (
							<Typography variant='body2' color='text.secondary' sx={{ textAlign: "center", mt: 2 }}>
								Aún no hay likes
							</Typography>
						)}
					</List>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default PostCard;
