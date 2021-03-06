import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    credentials: null,
    userDataPage: {},
    notifications: [],
    countNotifications: 0,
    unReadNotifications: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserData: (state, action) => {
      state.credentials = action.payload;
    },
    setUserDataPage: (state, action) => {
      state.userDataPage = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setCountNotifications: (state, action) => {
      state.countNotifications = action.payload;
    },
    setUnReadNotifications: (state, action) => {
      state.unReadNotifications = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setUserData,
  setUserDataPage,
  setNotifications,
  setCountNotifications,
  setUnReadNotifications,
} = counterSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserData = (state) => state.user.credentials;
export const selectUserDataPage = (state) => state.user.userDataPage;
export const selectNotifications = (state) => state.user.notifications;
export const selectCountNotifications = (state) =>
  state.user.countNotifications;
export const selectUnReadNotifications = (state) =>
  state.user.unReadNotifications;

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
          dispatch(getUserProfile(user));
        })
        .catch((err) => {
          console.log(err?.response?.data?.error);
        });
    } catch (err) {
      throw err;
    }
  };

export const EditUserProfile =
  (dataForm, setError, setConfirmLoading, setVisible, user) =>
  async (dispatch, getState) => {
    try {
      setConfirmLoading(true);
      await axios
        .patch(
          `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/users/me`,
          {
            website: dataForm.website || '',
            bio: dataForm.bio || '',
            location: dataForm.location || '',
          },
          {
            headers: {
              Authorization: 'Bearer ' + user,
            },
          }
        )
        .then((res) => {
          dispatch(getUserProfile(user));
          setVisible(false);
          console.log(res);
        })
        .catch((err) => {
          setError(err?.response?.data?.error);
        });
      setConfirmLoading(false);
      console.log(dataForm);
      setConfirmLoading(false);
    } catch (err) {
      setConfirmLoading(false);
      throw err;
    }
  };

export const getUserProfile = (user) => async (dispatch, getState) => {
  try {
    await axios
      .get(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/users/me`, {
        headers: {
          Authorization: 'Bearer ' + user,
        },
      })
      .then((res) => {
        dispatch(setUserData(res.data));
        dispatch(setNotifications(res.data.notifications));
        let countUnreadNotification = 0;
        let unReadNotification = [];
        res.data.notifications.map((item) => {
          if (!item.read) {
            ++countUnreadNotification;
            unReadNotification.push(item.notificationId);
          }
        });
        dispatch(setCountNotifications(countUnreadNotification));
        dispatch(setUnReadNotifications(unReadNotification));
      })
      .catch((err) => {
        localStorage.removeItem('token');
        console.log(err?.response?.data?.error);
      });
  } catch (err) {
    throw err;
  }
};

export const getUserPage = (handle) => async (dispatch, getState) => {
  try {
    await axios
      .get(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/users/${handle}`)
      .then((res) => {
        dispatch(setUserDataPage(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    throw err;
  }
};

export const readNotification =
  (user, unread) => async (dispatch, getState) => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/notifications/makeRead`,
          {
            notifications: unread,
          },
          {
            headers: {
              Authorization: 'Bearer ' + user,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      throw err;
    }
  };

export default counterSlice.reducer;
