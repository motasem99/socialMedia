import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
  },
  reducers: {
    setName: (state) => {
      state.name = 'mutasem';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = counterSlice.actions;

export default counterSlice.reducer;
