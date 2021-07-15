import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const ScreamsSlice = createSlice({
  name: 'scream',
  initialState: {
    screams: [],
    commentData: {},
  },
  reducers: {
    setScreams: (state, action) => {
      state.screams = [...action.payload];
    },
    setCommentData: (state, action) => {
      state.commentData = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScreams, setCommentData } = ScreamsSlice.actions;

export const selectScreams = (state) => state.screams.screams;
export const selectCommentData = (state) => state.screams.commentData;

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
          dispatch(getScreams());
          setVisible(false);
        })
        .catch((err) => {
          setError(err?.response?.data?.error);
        });
    } catch (err) {
      throw err;
    }
  };

export const deletePost = (postId, user) => async (dispatch, getState) => {
  console.log(postId);
  try {
    await axios
      .delete(
        `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/screams/${postId}`,
        {
          headers: {
            Authorization: 'Bearer ' + user,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(getScreams());
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    throw err;
  }
};

export const likeScream =
  (user, setLike, like, screamId) => async (dispatch, getState) => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/screams/${screamId}/unlike`,
          null,
          {
            headers: {
              Authorization: 'Bearer ' + user,
            },
          }
        )
        .then((res) => {
          setLike(false);
          dispatch(getScreams());
        })
        .catch((err) => {
          console.log(err?.response?.data?.error);
        });
    } catch (err) {
      throw err;
    }
  };

export const disLikeScream =
  (user, setLike, like, screamId) => async (dispatch, getState) => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/screams/${screamId}/like`,
          null,
          {
            headers: {
              Authorization: 'Bearer ' + user,
            },
          }
        )
        .then((res) => {
          setLike(true);
          dispatch(getScreams());
        })
        .catch((err) => {
          console.log(err?.response?.data?.error);
        });
    } catch (err) {
      throw err;
    }
  };

export const getScream = (screamId) => async (dispatch, getState) => {
  try {
    await axios
      .get(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/api/screams/${screamId}`)
      .then((res) => {
        dispatch(setCommentData(res.data));
      })
      .catch((err) => {
        console.log(err?.response?.data?.error);
      });
  } catch (err) {
    throw err;
  }
};

export default ScreamsSlice.reducer;
