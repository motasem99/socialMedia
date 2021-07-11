import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const signup =
  (data, setError, setSpinnerLoading) => async (dispatch, getState) => {
    try {
      setSpinnerLoading(true);
      await axios
        .post(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/users/signup`, {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          handle: data.userHandle,
        })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
        })
        .catch((err) => {
          console.log(err?.response?.data?.error);
          setError(err?.response?.data?.error);
        });
      setSpinnerLoading(false);
    } catch (err) {
      setSpinnerLoading(false);
      throw err;
    }
  };

export default counterSlice.reducer;
