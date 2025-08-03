import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useCallback, useRef, useState } from "react";
import PostCard from "./atoms/PostCard";
import UploadFilesInicio from "./atoms/UploadFilesInicio";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../../redux/slices/postsSlice";
import SkeletonPostCard from "../../../squeletons/SkeletonPostCard";
import { showModal } from "../../../../redux/slices/modalSlice";
import Swal from "sweetalert2";
import { getPost } from "../../../../services/postsService";

const Posts = ({ idSharedPost }) => {
	const dispatch = useDispatch();
	const { posts, loading, page, limit, hasMore } = useSelector((state) => state.posts);
	const [mapedPost, setMapedPost] = useState([]);
	const timeoutRef = useRef(null);

	useEffect(() => {
		if (idSharedPost) {
			const fetchPost = async () => {
				try {
					const post = await getPost(idSharedPost);
					console.log("post --->", post);

					if (!post) {
						Swal.fire("Error", "No se pudo encontrar la publicación compartida", "error");
						return;
					}

					dispatch(
						showModal({
							modalType: "SHOW_POST",
							modalProps: {
								post,
							},
						})
					);
				} catch (error) {
					console.error("Error al obtener el post:", error);
					Swal.fire("Error", "Hubo un problema al cargar la publicación", "error");
				}
			};

			fetchPost();
		}
	}, [idSharedPost]);

	useEffect(() => {
		const filteredPosts = posts.filter((post) => post.media_type !== "video");
		console.log("filteredPosts desde POST", filteredPosts);
		setMapedPost(filteredPosts);
	}, [posts]);

	//Obtener primeros post, y cada vez que scrolea
	useEffect(() => {
		dispatch(fetchPosts({ page: 1, limit }));
	}, [dispatch, limit]);

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
		<Box>
			<Box sx={{ width: "100%" }}>
				<UploadFilesInicio />
			</Box>

			{loading && mapedPost.length === 0 ? (
				<Box sx={{ width: "100%" }}>
					<SkeletonPostCard />
					<SkeletonPostCard />
					<SkeletonPostCard />
				</Box>
			) : (
				mapedPost?.length > 0 &&
				mapedPost.map((post) => (
					<Box key={post.id} sx={{ width: "100%" }}>
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
				<Box sx={{ width: "100%" }}>
					<SkeletonPostCard />
				</Box>
			)}
		</Box>
	);
};

export default Posts;
