import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	reloadPerfilData: false,
	reloadUsers: false,
	themeColor: "light", // o "dark"
	user: {
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
	pagination: {
		page: 1,
		limit: 5,
	},
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setReloadPerfilData(state) {
			state.reloadPerfilData = !state.reloadPerfilData;
		},
		toggleReloadUsers(state) {
			state.reloadUsers = !state.reloadUsers;
		},

		setThemeColor(state, action) {
			state.themeColor = action.payload;
		},
		setLoggedUser(state, action) {
			state.user = action.payload;
		},
		clearLoggedUser(state) {
			state.user = null;
		},
		setPage(state, action) {
			state.pagination.page = action.payload;
		},
		setLimit(state, action) {
			state.pagination.limit = action.payload;
		},
	},
});

export const { setReloadPerfilData, toggleReloadUsers, setThemeColor, setLoggedUser, clearLoggedUser, setPage, setLimit } = appSlice.actions;
export default appSlice.reducer;
