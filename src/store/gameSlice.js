import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: 'Guest',
	imgs: [],
};

const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setImg: (state, action) => {
			state.imgs.add(action.payload);
		},
	},
});

export const { setName, setImg } = statusSlice.actions;
export default statusSlice.reducer;
