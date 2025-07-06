import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	option: "A", // default
};

const mainContainSlice = createSlice({
	name: "mainContain",
	initialState,
	reducers: {
		setCurrentTab: (state, action) => {
			state.option = action.payload;
		},
	},
});

export const { setCurrentTab } = mainContainSlice.actions;
export default mainContainSlice.reducer;
