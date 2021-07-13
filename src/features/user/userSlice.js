import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = counterSlice.actions;

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

export const login =
  (data, setError, setSpinnerLoading) => async (dispatch, getState) => {
    try {
      try {
        setSpinnerLoading(true);
        await axios
          .post(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/users/login`, {
            email: data.email,
            password: data.password,
          })
          .then((res) => {
            localStorage.setItem('token', res.data.token);
            dispatch(setUser(res.data.token));
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
    } catch (err) {
      throw err;
    }
  };

export const uploadUserPhoto =
  (formData, user) => async (dispatch, getState) => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/users/uploadImage`,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + user,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err?.response?.data?.error);
        });
    } catch (err) {
      throw err;
    }
  };

export default counterSlice.reducer;
