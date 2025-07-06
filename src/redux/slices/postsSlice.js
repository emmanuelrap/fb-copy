import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedPosts } from "../../services/postsService";
import { createComment } from "../../services/commentService";
import { addLikeToPost } from "../../services/likeService"; // tu servicio para like

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({ page = 1, limit = 5 }, thunkAPI) => {
	const response = await getPaginatedPosts(page, limit);
	return { posts: response, page };
});

// Thunk para agregar comentario
export const addComment = createAsyncThunk("posts/addComment", async ({ postId, userId, content, media_url }, thunkAPI) => {
	const response = await createComment({ postId, userId, content, media_url });
	if (response.success) {
		return response.comment;
	} else {
		return thunkAPI.rejectWithValue(response.error || "Error al crear comentario");
	}
});

// Thunk para agregar like
export const addLike = createAsyncThunk("posts/addLike", async ({ postId, userId }, thunkAPI) => {
	try {
		const response = await addLikeToPost({ postId, userId }); // tu llamada a Axios
		if (response.success) {
			return { postId, like: response.like }; // trae el like del backend (o null si quitó)
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
				const post = state.posts.find((p) => p.id === newComment.postId);
				if (post) {
					post.comments = post.comments ? [...post.comments, newComment] : [newComment];
				}
			})
			.addCase(addComment.rejected, (state, action) => {
				state.commenting = false;
				state.error = action.payload || action.error.message;
			})

			// addLike
			.addCase(addLike.pending, (state) => {
				state.liking = true;
				state.error = null;
			})
			.addCase(addLike.fulfilled, (state, action) => {
				state.liking = false;
				const { postId, like } = action.payload;
				const post = state.posts.find((p) => p.id === postId);

				if (post) {
					if (!post.likes) post.likes = [];

					if (like === null) {
						// Se quitó el like
						post.likes = post.likes.filter((l) => l.userId !== action.meta.arg.userId);
						post.likesCount = (post.likesCount || 1) - 1;
						if (post.likesCount < 0) post.likesCount = 0;
					} else {
						// Se agregó un like nuevo con data del user
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
