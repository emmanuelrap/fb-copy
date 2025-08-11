import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/notificationService";

export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async (userid) => {
	console.log("[ejecución] fetchNotifications()", userid);
	return await getNotifications(userid);
});

const notificationsSlice = createSlice({
	name: "notifications",
	initialState: {
		notifications: [],
		loading: false,
		error: null,
	},
	reducers: {
		addNotification: (state, action) => {
			// Agregar al inicio del array
			state.notifications.unshift(action.payload);
		},
		readNotificationRedux: (state, action) => {
			const notif = state.notifications.find((n) => n.id === action.payload);
			if (notif) {
				notif.is_read = true; // mutación directa, Immer lo maneja con redux toolkit
				console.log("notifications", JSON.parse(JSON.stringify(state.notifications)));
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotifications.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchNotifications.fulfilled, (state, action) => {
				state.loading = false;
				state.notifications = action.payload;
			})
			.addCase(fetchNotifications.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { addNotification, readNotificationRedux } = notificationsSlice.actions;
export default notificationsSlice.reducer;
