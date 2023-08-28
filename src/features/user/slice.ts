import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserByProfileIdApi } from './api';

const initialState: Profile = {
  bio: null,
  isSignedUser: false,
  todaySchedules: [],
  trackers: [],
};

export const fetchParamsUser = createAsyncThunk(
  'profile/fetchParamsUer',
  async (userData: ParamsUserValue) => {
    const res = await getUserByProfileIdApi(userData);
    return res;
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setTrackers: (state, action: PayloadAction<Tracker[]>) => {
      state.trackers = action.payload;
    },
    setSchedules: (state, action: PayloadAction<ScheduleFull[]>) => {
      state.todaySchedules = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParamsUser.fulfilled, (state, action) => {
      const { status, data } = action.payload;
      if (status === 200) {
        state.bio = data.bio;
        state.isSignedUser = data.isSigned;
        state.todaySchedules = data.schedules;
        state.trackers = data.trackers;
      } else {
        state.bio = null;
        state.isSignedUser = false;
        state.todaySchedules = [];
        state.trackers = [];
      }
    });
    builder.addCase(fetchParamsUser.rejected, (state) => {
      state.bio = null;
      state.isSignedUser = false;
      state.todaySchedules = [];
      state.trackers = [];
    });
  },
});

export const { setTrackers, setSchedules } = profileSlice.actions;

export default profileSlice.reducer;
