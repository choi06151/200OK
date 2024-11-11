import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  water: 5,
  food: 5,
  hp: 10,
  timeLeft: 30,
  name: 'Guest',
  userId: -1,
  content: '',
  choice: 1,
  choice1: '',
  choice2: '',
  choice3: '',
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setChoice: (state, action) => {
      state.choice = action.payload;
    },
    setChoice1: (state, action) => {
      state.choice1 = action.payload;
    },
    setChoice2: (state, action) => {
      state.choice2 = action.payload;
    },
    setChoice3: (state, action) => {
      state.choice3 = action.payload;
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
  setContent,
  setChoice,
  setChoice1,
  setChoice2,
  setChoice3,
  setUserId,
} = statusSlice.actions;
export default statusSlice.reducer;
