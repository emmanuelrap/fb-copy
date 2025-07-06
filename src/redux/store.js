import { configureStore } from "@reduxjs/toolkit";
import mainContainReducer from "./slices/mainContainSlice";
import appReducer from "./slices/appSlice";
import usersReducer from "./slices/userSlice";
import postsReducer from "./slices/postsSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
	reducer: {
		mainContain: mainContainReducer,
		app: appReducer,
		users: usersReducer,
		posts: postsReducer,
		modal: modalReducer,
	},
});
