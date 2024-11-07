import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  water: 5,
  food: 5,
  hp: 10,
  timeLeft: 30,
  name: 'Guest',
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setWater: (state, action) => {
      state.water = action.payload;
    },
    setFood: (state, action) => {
      state.food = action.payload;
    },
    setHp: (state, action) => {
      state.hp = action.payload;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    decreaseTimeLeft: (state) => {
      state.timeLeft -= 1;
    },
    decreaseWater: (state) => {
      state.water -= 1;
    },
    decreaseFood: (state) => {
      state.food -= 1;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    resetStatus: () => initialState,
  },
});

export const {
  setWater,
  setFood,
  setHp,
  setTimeLeft,
  setName,
  decreaseFood,
  decreaseWater,
  decreaseTimeLeft,
  resetStatus,
} = statusSlice.actions;
export default statusSlice.reducer;
