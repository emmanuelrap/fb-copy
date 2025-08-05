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
	InputAdornment,
	Tooltip,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch } from "react-redux";
import { addComment, addLike, removeComment, removePost, updateCommentRedux } from "../../../../../redux/slices/postsSlice";
import Swal from "sweetalert2";
import { showModal } from "../../../../../redux/slices/modalSlice";
import ShareButton from "./ShareButton";
import { useNavigate } from "react-router-dom";
import MenuComment from "./MenuComment";
import { delay } from "../../../../../helpers/delay";
import MenuPost from "./MenuPost";
import { useIsMobile } from "../../../../../hooks/useIsMobile";

const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMobile = useIsMobile();

	const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [comment, setComment] = useState("");
	const [commenting, setCommenting] = useState(false);
	const [liked, setLiked] = useState(false);
	const [liking, setLiking] = useState(false);
	const [animateLike, setAnimateLike] = useState(false);
	const [likesModalOpen, setLikesModalOpen] = useState(false);
	const [deletingCommentId, setDeletingCommentId] = useState(null);
	const [updatingCommentId, setUpdatingCommentId] = useState(null);
	const [updateCommentContent, setUpdateCommentContent] = useState(null);
	const [deletingPostId, setDeletingPostId] = useState(null);

	useEffect(() => {
		if (liked) {
			setAnimateLike(true);
			setTimeout(() => setAnimateLike(false), 200);
		}
	}, [liked]);

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

	//ELIMINAR UN COMENTARIO
	const handleDeleteComment = async (commentId) => {
		console.log("handleDeleteComment()", commentId);
		setDeletingCommentId(commentId);
		try {
			await delay(500);
			dispatch(removeComment({ commentId, postId: post.id }));
		} catch (error) {
			Swal.fire("Error", error.message || "No se pudo eliminar el comentario", "error");
		}
	};

	//MODIFICAR UN COMENTARIO
	const handleUpdateComment = async () => {
		try {
			await delay(500);
			dispatch(updateCommentRedux({ commentId: updatingCommentId, postId: post.id, content: updateCommentContent }));
			setUpdatingCommentId(null);
		} catch (error) {
			Swal.fire("Error", error.message || "No se pudo eliminar el comentario", "error");
		}
		setUpdatingCommentId(false);
		setUpdateCommentContent(null);
	};

	const handleUpdatingComment = async (commentId) => {
		setUpdatingCommentId(commentId);
	};

	//ELIMINAR UN POST
	const handleDeletePost = async (postId) => {
		console.log("postId()", postId);

		const result = await Swal.fire({
			title: "¿Estás seguro que quieres eliminar este post?",
			text: "¡No podrás deshacer esta acción!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
		});

		if (result.isConfirmed) {
			try {
				setDeletingPostId(post.id);
				await delay(500);
				dispatch(removePost({ postId }));
				// Swal.fire("¡Eliminado!", "El post ha sido eliminado.", "success");
			} catch (error) {
				Swal.fire("Error", "No se pudo eliminar el post.", "error");
				console.error(error);
			}
		}
	};

	const handleOpenLikes = () => setLikesModalOpen(true);
	const handleCloseLikes = () => setLikesModalOpen(false);

	//mostrar publicacion concreta al dar click
	const handleImageClick = () => {
		// dispatch(showPostModal({ dataPost: post }));
		console.log("CLIC EN IMAGEN");
		dispatch(
			showModal({
				modalType: "SHOW_POST",
				modalProps: {
					post,
				},
			})
		);
		window.history.replaceState(null, "", "/home/post/" + post.id);
	};

	return (
		<>
			<Card
				sx={{
					mx: isMobile ? "1rem" : "2.5rem",
					mb: isMobile ? "1rem" : "1.5rem",
					borderRadius: 5,
					boxShadow: 5,
					opacity: deletingPostId === post.id ? 0.5 : 1,
					transition: "opacity 1s ease, transform 0.5s ease",
				}}
			>
				<CardHeader
					sx={{ mb: "-1rem" }}
					avatar={<Avatar src={post.user?.avatar_url || ""} />}
					action={<MenuPost isMine={post.user.id === loggedUser.id} onDelete={() => handleDeletePost(post.id)} setDeletingPostId={setDeletingPostId} postId={post.id} />}
					title={
						<Box sx={{ display: "flex" }}>
							<Typography fontWeight='bold' sx={{ mr: "0.6rem", cursor: "pointer" }} onClick={() => navigate(`/perfil/${post?.user?.id}`)}>
								{post.user?.full_name} {post?.user?.id === loggedUser?.id && " (Yo) "}
							</Typography>
							{post.media_type === "cover_image_update" && <Typography color='text.secondary'>actualizó su foto de portada</Typography>}
							{post.media_type === "profile_image_update" && <Typography color='text.secondary'>actualizó su foto de perfil</Typography>}
						</Box>
					}
					subheader={new Date(post.created_at).toLocaleString()}
				/>

				<CardContent>
					<Typography variant='body1'>{post.text_content}</Typography>
				</CardContent>

				{/* Imágenes */}
				{post.media_url && (post.media_type === "image" || post.media_type === "profile_image_update" || post.media_type === "cover_image_update") && (
					<CardMedia component='img' image={post.media_url} alt='Imagen' sx={{ maxHeight: 500, objectFit: "cover", cursor: "pointer" }} onClick={handleImageClick} />
				)}

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
					<Typography variant='body2' color='text.secondary' onClick={handleToggleComment} sx={{ cursor: "pointer" }}>
						{post.comments?.length > 1 ? `${post.comments.length} comentarios` : post.comments?.length === 1 ? "1 comentario" : "Aún no hay comentarios"}
					</Typography>
				</Box>

				<CardActions
					disableSpacing
					sx={{
						borderTop: "1px solid #eee",
						justifyContent: "space-between",
						px: 1,
					}}
				>
					{/* Me gusta */}
					<Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
						<Button
							onClick={handleLikeClick}
							variant='text'
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
					</Box>

					{/* Comentar */}
					<Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
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
					</Box>

					{/* Compartir (envuelto bien en el Box) */}

					<ShareButton postUrl={`https://tusitio.com/post/${post.id}`} />
				</CardActions>

				{/* Comentarios */}
				{showCommentBox && (
					<>
						{post.commentsCount > 0 && <Divider />}
						{post.comments?.map((comment) => (
							<Box
								key={comment.id}
								sx={{
									display: "flex",
									alignItems: "flex-start",
									m: 1,
									opacity: deletingCommentId === comment.id ? 0.4 : 1,
									transition: "opacity 0.5s ease, transform 0.5s ease",
									transform: deletingCommentId === comment.id ? "scale(0.95)" : "scale(1)",
								}}
							>
								<Avatar src={comment.avatar_url} onClick={() => navigate(`/perfil/${comment.userid}`)} sx={{ cursor: "pointer", mr: 1.5 }} />
								<Box sx={{ backgroundColor: "#f0f2f5", borderRadius: 5, p: 1.5, maxWidth: "80%" }}>
									<Typography variant='subtitle2' sx={{ fontWeight: 600, mt: -1, cursor: "pointer" }} onClick={() => navigate(`/perfil/${comment.userid}`)}>
										{comment.full_name}
									</Typography>

									{comment.id === updatingCommentId ? (
										<TextField
											value={updateCommentContent}
											onChange={(e) => setUpdateCommentContent(e.target.value)}
											fullWidth
											sx={{ mb: 2 }}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<Button variant='contained' size='small' onClick={handleUpdateComment}>
															Guardar
														</Button>
													</InputAdornment>
												),
											}}
										/>
									) : (
										<Typography sx={{ mb: -1 }} variant='body2'>
											{comment.content}
										</Typography>
									)}
								</Box>

								<MenuComment
									isMine={comment.userid === loggedUser.id}
									id={comment.id}
									onDelete={() => handleDeleteComment(comment.id)}
									onUpdate={() => handleUpdatingComment(comment.id)}
									comment={comment}
									setUpdateCommentContent={setUpdateCommentContent}
								/>
							</Box>
						))}
						<Divider />
						<Box sx={{ px: 2, py: 2, borderTop: "1px solid #eee" }}>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Avatar src={loggedUser?.avatar_url || ""} sx={{ mr: "0.5rem" }} />
								<TextField
									fullWidth
									multiline
									rows={2}
									placeholder='Escribe un comentario...'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault(); // evita salto de línea
											if (comment.trim() && !commenting) {
												handleCommentSubmit();
											}
										}
									}}
									disabled={commenting}
								/>
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
									<Avatar src={like?.avatar_url} />
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
