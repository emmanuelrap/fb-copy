import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		modalType: null,
		modalProps: {},
	},
	reducers: {
		showModal: (state, action) => {
			state.modalType = action.payload.modalType;
			state.modalProps = action.payload.modalProps || {};
		},
		hideModal: (state) => {
			state.modalType = null;
			state.modalProps = {};
		},
	},
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
