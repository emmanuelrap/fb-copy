import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useCallback, useRef, useState } from "react";
import PostCard from "./atoms/PostCard";
import UploadFilesInicio from "./atoms/UploadFilesInicio";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../../redux/slices/postsSlice";
import SkeletonPostCard from "../../../squeletons/SkeletonPostCard";

const Posts = () => {
	const dispatch = useDispatch();
	const { posts, loading, page, limit, hasMore } = useSelector((state) => state.posts);
	const [mapedPost, setMapedPost] = useState([]);
	const [reload, setReload] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		const filteredPosts = posts.filter((post) => post.media_type !== "video");
		console.log("filteredPosts desde POST", filteredPosts);
		setMapedPost(filteredPosts);
	}, [posts]);

	useEffect(() => {
		dispatch(fetchPosts({ page: 1, limit }));
	}, [dispatch, limit, reload]);

	const handleScroll = useCallback(() => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
			if (timeoutRef.current) return; // Si ya hay un timeout, no hacer nada

			timeoutRef.current = setTimeout(() => {
				dispatch(fetchPosts({ page: page + 1, limit }));
				timeoutRef.current = null; // Limpia el timeout para permitir otro dispatch después
			}, 500); // Espera 1 segundo
		}
	}, [dispatch, loading, page, limit, hasMore]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [handleScroll]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				mt: 2,
			}}
		>
			<UploadFilesInicio />

			{loading && mapedPost.length === 0 ? (
				<Box sx={{ width: "95%" }}>
					<SkeletonPostCard />
					<SkeletonPostCard />
					<SkeletonPostCard />
				</Box>
			) : (
				mapedPost?.length > 0 &&
				mapedPost.map((post) => (
					<Box key={post.id} sx={{ width: "95%" }}>
						<PostCard post={post} />
					</Box>
				))
			)}

			{hasMore}

			{!hasMore ? (
				<Box sx={{ mt: 2, color: "white", height: "3rem" }}>
					<strong>No hay más posts</strong>.
				</Box>
			) : (
				<Box sx={{ width: "95%" }}>
					<SkeletonPostCard />
				</Box>
			)}
		</Box>
	);
};

export default Posts;
