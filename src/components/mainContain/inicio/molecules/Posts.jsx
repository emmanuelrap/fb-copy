import { Box } from "@mui/material";
import React from "react";
import PostCard from "./atoms/PostCard";

const posts = [
	{
		id: 1,
		user: {
			name: "Carlos Zambrano",
			avatar: "/statics/images/avatars/perfil.jpg",
		},
		time: "Hace 3 horas",
		content: "¡Qué gran día en la playa! 🌞🏖️",
		image: "https://images.unsplash.com/photo-1526512340740-9217d0159da9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVydGljYWx8ZW58MHx8MHx8fDA%3D",
		likes: 120,
		comments: 45,
	},
	{
		id: 2,
		user: {
			name: "Lucía Méndez",
			avatar: "/statics/images/avatars/lucia.jpg",
		},
		time: "Hace 1 hora",
		content: "Probando una nueva receta 😋",
		image: "https://cdn.sanity.io/images/esqfj3od/production/ebf9306185383e07e0ac192809e56f89c94fe689-1080x720.webp?w=3840&q=65&fit=clip&auto=format",
		likes: 200,
		comments: 60,
	},
	{
		id: 3,
		user: {
			name: "Pedro Ramírez",
			avatar: "/statics/images/avatars/pedro.jpg",
		},
		time: "Hace 10 minutos",
		content: "Este atardecer fue increíble 😍🌅",
		image: "https://8820244.fs1.hubspotusercontent-na1.net/hubfs/8820244/shutterstock_647628562.jpg",
		likes: 89,
		comments: 22,
	},
];

const Posts = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center", // Centra horizontalmente los hijos
				width: "100%", // El contenedor ocupa todo el ancho
				mt: 2,
			}}
		>
			{posts.map((post) => (
				<Box key={post.id} sx={{ width: "100%", maxWidth: 600 }}>
					<PostCard post={post} />
				</Box>
			))}
		</Box>
	);
};

export default Posts;
