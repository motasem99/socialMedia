import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setName: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = counterSlice.actions;

export const selectUser = (state) => state.user.user;

export const signup = (data) => (dispatch, getState) => {
  console.log(data);
};

export default counterSlice.reducer;
