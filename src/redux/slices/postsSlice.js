import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deletePost, getPaginatedPosts } from "../../services/postsService";
import { createComment, deleteComment, updateComment } from "../../services/commentService";
import { addLikeToPost } from "../../services/likeService"; // tu servicio para like

// Thunk para obtener post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({ page = 1, limit = 5 }, thunkAPI) => {
	const response = await getPaginatedPosts(page, limit);
	return { posts: response, page };
});

// Thunk para agregar comentario
export const addComment = createAsyncThunk("posts/addComment", async ({ postid, userid, content, media_url }, thunkAPI) => {
	console.log("[ejecución] addComment()", postid, userid, content, media_url);
	const response = await createComment({ postid, userid, content, media_url });
	if (response.success) {
		return response.comment;
	} else {
		return thunkAPI.rejectWithValue(response.error || "Error al crear comentario");
	}
});

//Thunk para eliminar comentario
export const removeComment = createAsyncThunk("posts/deleteComment", async ({ commentId, postId }, thunkAPI) => {
	console.log("[ejecución] removeComment()", commentId);
	const response = await deleteComment(commentId);
	if (response.success) {
		return response.comment;
	} else {
		return thunkAPI.rejectWithValue(response.error || "Error al eliminar comentario");
	}
});

//Thunk para modificar comentario
export const updateCommentRedux = createAsyncThunk("posts/updateCommentRedux", async ({ commentId, postId, content }, thunkAPI) => {
	console.log("[ejecución] updateCommentRedux()", commentId);
	const updatedData = { content };
	const response = await updateComment(commentId, updatedData);
	if (response.success) {
		return response.comment;
	} else {
		return thunkAPI.rejectWithValue(response.error || "Error al modificar comentario");
	}
});

//Thunk para eliminar post
export const removePost = createAsyncThunk("posts/removePost", async ({ postId }, thunkAPI) => {
	console.log("[ejecución] removePost()", postId);
	const response = await deletePost(postId);
	if (response.success) {
		return response.comment;
	} else {
		return thunkAPI.rejectWithValue(response.error || "Error al eliminar post");
	}
});

// Thunk para agregar like
export const addLike = createAsyncThunk("posts/addLike", async ({ postid, userid }, thunkAPI) => {
	try {
		const response = await addLikeToPost({ postid, userid });
		if (response.success) {
			return { postid, like: response.like }; // trae el like del backend (o null si quitó)
		} else {
			return thunkAPI.rejectWithValue(response.error || "Error al dar like");
		}
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message || "Error desconocido al dar like");
	}
});

const postSlice = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		loading: false,
		error: null,
		page: 1,
		limit: 5,
		hasMore: true,
		commenting: false,
		liking: false,
	},
	reducers: {
		resetPosts(state) {
			state.posts = [];
			state.page = 1;
			state.hasMore = true;
		},
	},
	extraReducers: (builder) => {
		builder
			// fetchPosts
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				const { posts, page } = action.payload;
				if (posts.length === 0) {
					state.hasMore = false;
				} else {
					state.posts = page === 1 ? posts : [...state.posts, ...posts];
					state.page = page;
				}
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// addComment
			.addCase(addComment.pending, (state) => {
				state.commenting = true;
				state.error = null;
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.commenting = false;
				const newComment = action.payload;
				console.log("newComment newComment", newComment);
				const post = state.posts.find((p) => p.id === newComment.postid);
				if (post) {
					console.log("entro");
					post.comments = post.comments ? [...post.comments, newComment] : [newComment];
				} else {
					console.log("no entro");
				}
			})
			.addCase(addComment.rejected, (state, action) => {
				state.commenting = false;
				state.error = action.payload || action.error.message;
			})

			//removeComment
			.addCase(removeComment.fulfilled, (state, action) => {
				const postId = action.meta.arg.postId;
				const commentId = action.meta.arg.commentId;

				const post = state.posts.find((p) => p.id === postId);
				if (post && post.comments) {
					post.comments = post.comments.filter((c) => c.id !== commentId);
				}
			})

			//updateCommentRedux
			.addCase(updateCommentRedux.fulfilled, (state, action) => {
				const postId = action.meta.arg.postId;
				const commentId = action.meta.arg.commentId;
				const content = action.meta.arg.content;

				const post = state.posts.find((p) => p.id === postId);
				if (post && post.comments) {
					const comment = post.comments.find((c) => c.id === commentId);
					if (comment) {
						comment.content = content;
					}
				}
			})

			//removePost
			.addCase(removePost.fulfilled, (state, action) => {
				const postId = action.meta.arg.postId;
				state.posts = state.posts.filter((p) => p.id !== postId);
			})

			// addLike
			.addCase(addLike.pending, (state) => {
				state.liking = true;
				state.error = null;
			})
			.addCase(addLike.fulfilled, (state, action) => {
				state.liking = false;
				const { postid, like } = action.payload;

				console.log("Like recibido:", like);
				const post = state.posts.find((p) => p.id === postid);

				if (post) {
					if (!post.likes) post.likes = [];

					if (like === null) {
						// Se quitó el like
						post.likes = post.likes.filter((l) => l.userid !== action.meta.arg.userid);
						post.likesCount = (post.likesCount || 1) - 1;
						if (post.likesCount < 0) post.likesCount = 0;
					} else {
						post.likes.push(like);
						post.likesCount = (post.likesCount || 0) + 1;
					}
				}
			})

			.addCase(addLike.rejected, (state, action) => {
				state.liking = false;
				state.error = action.payload || action.error.message;
			});
	},
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
