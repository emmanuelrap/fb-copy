import React, { useEffect, useState } from "react";
import { Box, Avatar, Grid, Typography, Paper, Divider, CircularProgress } from "@mui/material";
import AppBar from "../AppBar/AppBar";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../services/userService";
import PostCard from "./inicio/molecules/atoms/PostCard";
import LoadingMUI from "../loading/LoadingMUI";

const ProfilePage = () => {
	const { idUser } = useParams();
	const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
	const [userDataProfile, setUserDataProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		const userIdToFetch = idUser == loggedUser.id ? loggedUser.id : idUser;

		async function fetchUserData() {
			setLoading(true);
			try {
				const data = await getUserProfile(userIdToFetch);
				setUserDataProfile(data);
			} catch (error) {
				console.error("Error cargando perfil:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchUserData();
	}, [idUser, loggedUser.id]);

	useEffect(() => {
		console.log("userDataProfile", userDataProfile);
	}, [userDataProfile]);

	if (loading) {
		return <LoadingMUI text={"Cargando perfil ..."} />;
	}

	return (
		<Box sx={{ width: "100%", bgcolor: "#f0f2f5", minHeight: "100vh" }}>
			<AppBar pageSelected={null} onlyHomeIcon={true} />
			<Box sx={{ maxWidth: 1200, mx: "auto" }}>
				{/* Portada */}
				<Box
					sx={{
						height: 400,
						backgroundImage: `url(${userDataProfile?.cover_photo_url || "https://www.shutterstock.com/image-vector/add-image-icon-picture-photo-600nw-2480803481.jpg"})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						position: "relative",
						mt: "3.5rem",
						borderRadius: 3,
					}}
				>
					{/* Avatar sobre portada */}
					<Avatar
						src={userDataProfile?.avatar_url}
						sx={{
							width: 160,
							height: 160,
							position: "absolute",
							bottom: -80,
							left: "50%",
							transform: "translateX(-50%)",
							border: "4px solid white",
						}}
					/>
				</Box>

				{/* Nombre */}
				<Box sx={{ textAlign: "center", mt: 10 }}>
					<Typography variant='h5' fontWeight={600}>
						{userDataProfile?.full_name}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{userDataProfile?.email} | Vive en México
					</Typography>
					<Divider sx={{ mt: 2 }} />
				</Box>

				{/* Layout de contenido */}
				<Grid container spacing={2} sx={{ mt: 2, px: { xs: 1, md: 4 } }}>
					{/* Columna Izquierda */}
					<Grid item xs={12} md={4} sx={{ width: "40%" }}>
						{/* Cuadro de Fotos */}
						<Paper sx={{ p: 2, borderRadius: 3 }}>
							<Typography variant='h6' mb={1}>
								Fotos
							</Typography>
							<Grid container spacing={0.5}>
								{userDataProfile?.posts
									.filter((post) => post.media_type === "image" && post.media_url) // solo imágenes con URL
									.map((post) => (
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
									))}
							</Grid>
						</Paper>

						{/* Amigos */}
						<Paper sx={{ p: 2, mt: 2, borderRadius: 3 }}>
							<Typography variant='h6' mb={1}>
								Amigos
							</Typography>
							<Grid container spacing={1}>
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<Grid item xs={4} key={i}>
										<Box textAlign='center'>
											<Avatar src={`https://via.placeholder.com/80`} sx={{ mx: "auto", mb: 0.5 }} />
											<Typography variant='caption'>Amigo {i}</Typography>
										</Box>
									</Grid>
								))}
							</Grid>
						</Paper>
					</Grid>

					{/* Columna Derecha (Publicaciones) */}
					<Grid item xs={12} md={8}>
						<Box>
							{/* Aquí van las publicaciones */}
							<Typography variant='h6' sx={{ mb: "1rem", ml: "2rem" }}>
								Publicaciones
							</Typography>
							<Box>
								{userDataProfile?.posts?.length > 0 &&
									userDataProfile.posts.map((post) => (
										<Box key={post.id}>
											<PostCard post={post} />
										</Box>
									))}
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
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
					}}
				>
					<Box
						component='img'
						src={selectedImage}
						alt='Imagen ampliada'
						sx={{
							maxWidth: "90%",
							maxHeight: "90%",
							borderRadius: 2,
							boxShadow: 24,
						}}
					/>
				</Box>
			)}
		</Box>
	);
};

export default ProfilePage;
