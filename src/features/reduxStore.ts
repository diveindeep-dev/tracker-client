import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/slice';
import profileSlice from './user/slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
  },
});

export default store;
