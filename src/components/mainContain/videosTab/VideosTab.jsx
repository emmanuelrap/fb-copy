import React, { useEffect, useState } from "react";
import PostCardVideo from "./molecules/atoms/PostCardVideo";
import { Box, Skeleton } from "@mui/material";
import LeftSection from "./molecules/LeftSection";
import { getAllPosts } from "../../../services/postsService";
import SkeletonPostVideo from "./molecules/SkeletonPostVideo";

const VideosTab = () => {
	const [mapedPost, setMapedPost] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchPosts() {
		try {
			const resAPI = await getAllPosts();
			const filteredPosts = resAPI.filter((post) => post.media_type?.toLowerCase() === "video");
			setMapedPost(filteredPosts);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}

	useEffect(() => {
		fetchPosts();
		// Simula 2 segundos de carga
		const timer = setTimeout(() => setLoading(false), 2000);
		return () => clearTimeout(timer); // cleanup
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<Box sx={{ display: { xs: "none", lg: "flex" }, flex: 3 }}>
				<LeftSection />
			</Box>

			<Box
				sx={{
					display: "flex",
					flex: 9,
					flexDirection: "column",
					alignItems: "center",
					background: "#55c",
					pt: "1rem",
				}}
			>
				{loading ? (
					<>
						<SkeletonPostVideo />
						<SkeletonPostVideo />
					</>
				) : (
					mapedPost.map((post) => (
						<Box key={post.id} sx={{ width: "100%" }}>
							<PostCardVideo post={post} fetchPosts={fetchPosts} />
						</Box>
					))
				)}
			</Box>
		</Box>
	);
};

export default VideosTab;
