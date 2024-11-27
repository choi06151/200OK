import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Guest',
  imgs: [],
  convimgs: [],
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
    setConvImgs: (state, action) => {
      state.convimgs.push(action.payload);
    },
    addWater: (state) => {
      state.water = state.water + 1;
    },
    addFood: (state) => {
      state.food = state.food + 1;
    },
  },
});

export const { setName, setImg, addWater, addFood, setConvImgs } =
  statusSlice.actions;
export default statusSlice.reducer;
