import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: 'Guest',
	imgs: [],
	water: 0,
	food: 0,
};

const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setImg: (state, action) => {
			state.imgs.push(action.payload);
		},
		addWater: (state, action) => {
			state.water = state.water + action.payload;
		},
		addFood: (state, action) => {
			state.food = state.food + action.p;
		},
	},
});

export const { setName, setImg, addWater, addFood } = statusSlice.actions;
export default statusSlice.reducer;
