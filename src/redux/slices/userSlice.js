// src/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../services/userService";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	return await getUsers();
});

const userSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
