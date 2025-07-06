import React, { useEffect, useState } from "react";
import PostCardVideo from "./molecules/atoms/PostCardVideo";
import { Box } from "@mui/material";
import LeftSection from "./molecules/LeftSection";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../../services/postsService";

const VideosTab = () => {
	const [mapedPost, setMapedPost] = useState([]);

	async function fetchPosts() {
		try {
			const resAPI = await getAllPosts(); // Espera a que la API responda
			console.log("resAPI", resAPI);
			const filteredPosts = resAPI.filter((post) => post.media_type?.toLowerCase() === "video");
			setMapedPost(filteredPosts);
			console.log("filteredPosts desde Videos", filteredPosts);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}

	useEffect(() => {
		fetchPosts();
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
				{mapedPost.map((post) => (
					<Box key={post.id} sx={{ width: "100%" }}>
						<PostCardVideo post={post} fetchPosts={fetchPosts} />
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default VideosTab;
