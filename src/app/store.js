import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import ScreamsSlice from '../features/Scream/scream';

export const store = configureStore({
  reducer: {
    user: userSlice,
    screams: ScreamsSlice,
  },
});
