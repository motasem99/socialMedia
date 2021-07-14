import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const ScreamsSlice = createSlice({
  name: 'scream',
  initialState: {
    screams: [],
  },
  reducers: {
    setScreams: (state, action) => {
      state.screams = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScreams } = ScreamsSlice.actions;

export const selectScreams = (state) => state.screams.screams;

export const getScreams = () => async (dispatch, getState) => {
  try {
    await axios
      .get(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/screams`)
      .then((res) => {
        dispatch(setScreams(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    throw err;
  }
};

export const addScreams =
  (formData, user, setError, setConfirmLoading, setVisible) =>
  async (dispatch, getState) => {
    try {
      setConfirmLoading(true);
      await axios
        .post(
          `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/screams`,
          {
            body: formData.post,
          },
          {
            headers: {
              Authorization: 'Bearer ' + user,
            },
          }
        )
        .then((res) => {
          dispatch(setScreams(res.data));
          setVisible(false);
          console.log(res);
        })
        .catch((err) => {
          setError(err?.response?.data?.error);
        });
    } catch (err) {
      throw err;
    }
  };

export default ScreamsSlice.reducer;
