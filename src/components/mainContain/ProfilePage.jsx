import React, { useEffect, useRef, useState } from "react";
import { Box, Avatar, Grid, Typography, Paper, Divider, Button, IconButton, Menu, MenuItem, ListItemIcon, Icon, Tooltip, AvatarGroup } from "@mui/material";

import AppBar from "../AppBar/AppBar";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, updateUser } from "../../services/userService";
import PostCard from "./inicio/molecules/atoms/PostCard";
import LoadingMUI from "../loading/LoadingMUI";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { uploadImageToCloudinary } from "../../services/uploadFile";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import Swal from "sweetalert2";
import { createPost } from "../../services/postsService";
import MyBackdrop from "../MUI/MyBackdrop";
import UploadFilesInicio from "./inicio/molecules/atoms/UploadFilesInicio";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "../../hooks/useIsMobile";

const ProfilePage = () => {
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const { idUser } = useParams(); // Usuario que esta mostrando actualmente
	const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
	const [userDataProfile, setUserDataProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadingChangeImage, setLoadingChangeImage] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [isMyPerfil, setIsMyPerfil] = useState(false);
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	const [showAllVideos, setShowAllVideos] = useState(false);

	// Menu estado
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	//Input del menu de subir foto perfil
	const fileInputRef = useRef(null);

	const handleClickUpload = () => {
		fileInputRef.current.click(); // Dispara el input oculto
	};

	//Menu
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	//Obtener la data del perfil con base en el URL
	useEffect(() => {
		const userIdToFetch = idUser;
		if (loggedUser.id == idUser) setIsMyPerfil(true);
		else setIsMyPerfil(false);

		const fetchUserData = async () => {
			setLoading(true);
			try {
				const data = await getUserProfile(userIdToFetch);
				setUserDataProfile(data);
				console.log("data->", data);
			} catch (error) {
				console.error("Error cargando perfil:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, [idUser, loggedUser.id]);

	if (loading) {
		return <LoadingMUI text={"Cargando perfil ..."} />;
	}

	//Cambiar imagenes de perfil y portada
	const handleChangePhotoPerfil = async (e) => {
		const file = e.target.files[0];
		if (file) {
			try {
				setLoadingChangeImage(true);
				const formData = new FormData();
				formData.append("image", file);
				const result = await uploadImageToCloudinary(formData, loggedUser.id);
				const mediaUrl = result.data.url;

				//modificar el usuario
				const dataToUpdate = {
					avatar_url: mediaUrl,
				};
				await updateUser(loggedUser.id, dataToUpdate);

				//Crear post de que cambio la imagen
				await createPost({
					userid: loggedUser.id,
					text_content: null,
					media_url: mediaUrl,
					media_type: "profile_image_update",
				});

				//Agregar nueva data a storage
				loggedUser.avatar_url = mediaUrl;
				localStorage.setItem("user", JSON.stringify(loggedUser));

				Swal.fire({
					icon: "success",
					title: "Imagen Subida",
					text: "Tu imagen su subió corectamente, ahora tus amigos pueden interactuar con ella",
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			} catch (e) {
				console.error("Error al subir imagebn de portada", e);
				Swal.fire("Error", "No se pudo subir la imagen de perfil", "error");
			} finally {
				setLoadingChangeImage(false);
			}
		}
	};

	const handleChangePhotoCover = async (e) => {
		const file = e.target.files[0];
		if (file) {
			try {
				setLoadingChangeImage(true);
				const formData = new FormData();
				formData.append("image", file);
				const result = await uploadImageToCloudinary(formData, loggedUser.id);
				const mediaUrl = result.data.url;

				//modificar el usuario
				const dataToUpdate = {
					cover_photo_url: mediaUrl,
				};
				await updateUser(loggedUser.id, dataToUpdate);

				//Crear post de que cambio la imagen
				await createPost({
					userid: loggedUser.id,
					text_content: null,
					media_url: mediaUrl,
					media_type: "cover_image_update",
				});

				//Agregar nueva data a storage
				loggedUser.cover_photo_url = mediaUrl;
				localStorage.setItem("user", JSON.stringify(loggedUser));

				Swal.fire({
					icon: "success",
					title: "Imagen Subida",
					text: "Tu imagen su subió corectamente, ahora tus amigos pueden interactuar con ella",
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
				});
			} catch (e) {
				console.error("Error al subir imagebn de portada", e);
				Swal.fire("Error", "No se pudo subir la imagen de portada", "error");
			} finally {
				setLoadingChangeImage(false);
			}
		}
	};

	//poner en grupos de 3 las imagenes
	const getGroupedPhotos = (posts, groupSize = 3) => {
		const filtered = posts.filter((post) => (post.media_type === "image" || post.media_type === "profile_image_update" || post.media_type === "cover_image_update") && post.media_url);

		const grouped = [];
		for (let i = 0; i < filtered.length; i += groupSize) {
			grouped.push(filtered.slice(i, i + groupSize));
		}
		return grouped;
	};

	//poner en grupos de 3 los videos
	const getGroupedVideos = (posts, groupSize = 3) => {
		const filtered = posts.filter((post) => post.media_type === "video" && post.media_url);

		const grouped = [];
		for (let i = 0; i < filtered.length; i += groupSize) {
			grouped.push(filtered.slice(i, i + groupSize));
		}
		return grouped;
	};

	return (
		<Box sx={{ bgcolor: "#f0f2f5" }}>
			<AppBar pageSelected={null} onlyHomeIcon={true} />
			<Box>
				{/* Portada */}
				<Box
					sx={{
						height: isMobile ? 200 : 400,
						backgroundImage: isMyPerfil
							? `url(${JSON.parse(localStorage.getItem("user") || "{}").cover_photo_url})`
							: `url(${userDataProfile?.cover_photo_url || "https://www.shutterstock.com/image-vector/add-image-icon-picture-photo-600nw-2480803481.jpg"})`,

						backgroundSize: "cover",
						backgroundPosition: "center",
						position: "relative",
						mt: "3.5rem",
						borderRadius: isMobile ? 0 : 3,
					}}
				>
					{/* Botón Avatar con menú */}
					<IconButton
						onClick={handleClick}
						sx={{ position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)", bgcolor: "white", boxShadow: 2, p: 0.5, "&:hover": { bgcolor: "#f0f0f0" } }}
					>
						<Avatar
							src={
								isMyPerfil
									? JSON.parse(localStorage.getItem("user") || "{}").avatar_url
									: userDataProfile?.avatar_url || "https://www.shutterstock.com/image-vector/add-image-icon-picture-photo-600nw-2480803481.jpg"
							}
							sx={{ width: 180, height: 180 }}
						/>
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						id='account-menu'
						open={open}
						onClose={handleClose}
						disableScrollLock
						PaperProps={{
							elevation: 4,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&::before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: "5.8rem",
									width: 10,
									height: 15,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<CameraAltIcon fontSize='small' />
							</ListItemIcon>
							Ver imagen de perfil
						</MenuItem>
						{isMyPerfil && (
							<MenuItem
								onClick={() => {
									handleClose();
									handleClickUpload();
								}}
							>
								<ListItemIcon>
									<ChangeCircleIcon fontSize='small' />
								</ListItemIcon>
								Cambiar imagen de perfil
							</MenuItem>
						)}

						{/* Input oculto */}
					</Menu>
					<input type='file' accept='image/*' hidden ref={fileInputRef} onChange={handleChangePhotoPerfil} />
					{/* Botón de cambiar portada */}
					{isMyPerfil ? (
						<>
							{isMobile ? (
								<>
									<IconButton
										disabled={loadingChangeImage}
										size='large'
										sx={{
											backgroundColor: "#ccc",
											position: "absolute",
											bottom: 15,
											right: 15,
											borderRadius: 10,
											p: 1.2,
										}}
										onClick={handleChangePhotoCover}
									>
										<CameraAltIcon sx={{ width: "2rem", height: "2rem" }} />
									</IconButton>
								</>
							) : (
								<Button
									disabled={loadingChangeImage}
									startIcon={<CameraAltIcon />}
									size='large'
									variant='contained'
									component='label'
									sx={{
										position: "absolute",
										bottom: 20,
										right: 20,
										borderRadius: 2,
									}}
									onClick={handleChangePhotoCover}
								>
									{loadingChangeImage ? <strong>Subiendo imagen...</strong> : <strong>Cambiar foto de portada</strong>}
									<input type='file' accept='image/*' hidden onChange={handleChangePhotoCover} />
								</Button>
							)}
						</>
					) : (
						<Box
							sx={{
								position: "absolute",
								bottom: 20,
								right: 20,
							}}
						>
							<Button startIcon={<PeopleIcon />} variant='outlined' component='label' onClick={() => {}} sx={{ borderRadius: 2, textTransform: "none", mr: 1 }}>
								<strong>Amigos</strong>
							</Button>
							<Button startIcon={<ChatIcon />} variant='contained' component='label' onClick={() => {}} sx={{ borderRadius: 2, textTransform: "none" }}>
								<strong>Enviar mensaje</strong>
							</Button>
						</Box>
					)}
				</Box>

				{/* Nombre */}
				<Box sx={{ textAlign: "center", mt: 12 }}>
					<Typography variant={isMobile ? "h5" : "h4"} fontWeight={800} sx={{ mb: 0.5 }}>
						{userDataProfile?.full_name}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{userDataProfile?.email} | Vive en México
					</Typography>
					<Divider sx={{ mt: 2 }} />
				</Box>

				{/* Layout de contenido */}
				<Grid container sx={{ mt: "2em" }}>
					{/* Columna Izquierda */}
					<Grid item xs={12} md={4} sx={{ mx: "auto" }}>
						<Box
							sx={{
								position: "sticky",
								top: "4.5rem",
								alignSelf: "flex-start",
							}}
						>
							{/* FOTOS */}
							<Paper sx={{ p: isMobile ? 0 : 2, borderRadius: isMobile ? 0 : 3, pt: 1 }}>
								<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
									<Typography variant='h6' mb={1} sx={{ ml: isMobile ? 2 : 0 }}>
										Fotos
									</Typography>
									{userDataProfile?.posts.filter((post) => (post.media_type === "image" || post.media_type === "profile_image_update" || post.media_type === "cover_image_update") && post.media_url)
										.length > 3 && (
										<Button size='large' variant='text' sx={{ textTransform: "none" }} onClick={() => setShowAllPhotos((prev) => !prev)}>
											{showAllPhotos ? "Ver menos imágenes" : "Ver todas las imágenes"}
										</Button>
									)}
								</Box>

								<>
									{getGroupedPhotos(userDataProfile?.posts || []).map((group, rowIndex) => {
										if (!showAllPhotos && rowIndex > 0) return null;

										return (
											<Grid container spacing={0.5} key={rowIndex}>
												{group.map((post, index) => (
													<Grid item xs={4} key={index}>
														<Box
															component='img'
															src={post.media_url}
															alt='Foto'
															sx={{
																width: 120,
																height: 120,
																objectFit: "cover",
																borderRadius: 1,
																cursor: "pointer",
															}}
															onClick={() => setSelectedImage(post.media_url)}
														/>
													</Grid>
												))}
											</Grid>
										);
									})}
								</>
							</Paper>

							{/* VIDEOS */}
							<Paper sx={{ p: isMobile ? 0 : 2, borderRadius: isMobile ? 0 : 3, mt: 2, pt: 1 }}>
								<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
									<Typography variant='h6' mb={1} sx={{ ml: isMobile ? 2 : 0 }}>
										Videos
									</Typography>
									{userDataProfile?.posts.filter((post) => post.media_type === "videos" && post.media_url).length > 3 && (
										<Button size='large' variant='text' sx={{ textTransform: "none" }} onClick={() => setShowAllPhotos((prev) => !prev)}>
											{showAllVideos ? "Ver menos videos" : "Ver todos los videos"}
										</Button>
									)}
								</Box>

								<>
									{getGroupedVideos(userDataProfile?.posts || []).map((group, rowIndex) => {
										if (!showAllVideos && rowIndex > 0) return null;

										return (
											<Grid container spacing={0.5} key={rowIndex} sx={{ pb: 0.5 }}>
												{group.map((post, index) => (
													<Grid item xs={4} key={index}>
														<Box
															key={index}
															sx={{
																width: 120,
																height: 120,
																overflow: "hidden",
																borderRadius: 1,
																cursor: "pointer",
															}}
															onClick={() => setSelectedImage(post.media_url)}
														>
															<video src={post.media_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted loop playsInline />
														</Box>
													</Grid>
												))}
											</Grid>
										);
									})}
								</>
							</Paper>

							{/* AMIGOS */}
							<Paper sx={{ p: 2, mt: 2, borderRadius: 3 }}>
								<Typography variant='h6' mb={1}>
									Amigos
								</Typography>
								<Grid container spacing={0}>
									{userDataProfile?.friends
										?.filter((friend) => friend.id !== loggedUser.id) // rectifico que no esté
										.map((friend) => (
											<Tooltip key={friend.id} title={friend.full_name}>
												<IconButton sx={{ p: 0.5, mr: -1 }} onClick={() => navigate(`/perfil/${friend.id}`)}>
													<Avatar src={friend.avatar_url} sx={{ mx: "auto" }} />
												</IconButton>
											</Tooltip>
										))}
								</Grid>
							</Paper>
						</Box>
					</Grid>

					{/* Columna Derecha (Publicaciones) */}
					<Grid item xs={12} md={9} sx={{ mt: -2 }}>
						{isMyPerfil && (
							<Box sx={{ borderRadius: 5, mb: "1rem", mt: "2rem" }}>
								<UploadFilesInicio />
							</Box>
						)}

						<Box>
							{userDataProfile?.posts?.length > 0 ? (
								userDataProfile.posts.map((post) => (
									<Box key={post.id}>
										<PostCard post={post} />
									</Box>
								))
							) : (
								<>
									<Typography sx={{ ml: "3rem" }}>No hay Publicaciones aún</Typography>
								</>
							)}
						</Box>
					</Grid>
				</Grid>
			</Box>

			{/* Modal de imagen seleccionada */}
			{/* Modal de imagen o video seleccionada */}
			{selectedImage && (
				<Box
					onClick={() => setSelectedImage(null)}
					sx={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						bgcolor: "rgba(0,0,0,0.8)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1300,
						cursor: "pointer",
					}}
				>
					{selectedImage.endsWith(".mp4") || selectedImage.endsWith(".webm") || selectedImage.endsWith(".ogg") ? (
						<video
							src={selectedImage}
							controls
							autoPlay
							style={{
								maxWidth: "90%",
								maxHeight: "90%",
								borderRadius: 8,
								boxShadow: "0 0 24px rgba(0,0,0,0.8)",
							}}
						/>
					) : (
						<Box
							component='img'
							src={selectedImage}
							alt='Media ampliada'
							sx={{
								maxWidth: "90%",
								maxHeight: "90%",
								borderRadius: 2,
								boxShadow: 24,
							}}
						/>
					)}
				</Box>
			)}

			<MyBackdrop open={loadingChangeImage} />
		</Box>
	);
};

export default ProfilePage;
