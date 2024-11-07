import { configureStore } from '@reduxjs/toolkit';
import statusReducer from './gameSlice';

const store = configureStore({
  reducer: {
    status: statusReducer,
  },
});

export default store;
