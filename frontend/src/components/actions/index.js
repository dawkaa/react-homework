import {
  MAKE_OUT_MAIN_FEATURED_POST_SUCCESS,
  MAKE_OUT_MAIN_FEATURED_POST_FAILURE,
  UPDATE_NOTIFY,
  EMPTY_NOTIFY,
  UPDATE_COMMENT_SUCCESS,
  FETCH_COMMENT_SUCCESS,
} from './actionTypes';
import Api from '../Api';

export const handleMainFeaturedPostFailure = (errorData) => (
  {
    type: MAKE_OUT_MAIN_FEATURED_POST_FAILURE,
    payload: errorData,
  }
);

export const handleMainFeaturedPostSuccess = (data) => (
  {
    type: MAKE_OUT_MAIN_FEATURED_POST_SUCCESS,
    payload: data,
  }
);

export const handleMainFeaturedPost = () => (dispatch) => {
  try {
    Api({
      method: 'GET',
      url: 'api/mainFeaturedPost',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        dispatch(handleMainFeaturedPostSuccess(response.data));
      });
  } catch (e) {
    dispatch(handleMainFeaturedPostFailure(e.message));
  }
};

export const updateNotify = (msj) => (
  {
    type: UPDATE_NOTIFY,
    payload: msj,
  }
);

export const emptyNotify = () => (
  {
    type: EMPTY_NOTIFY,
  }
);

export const updateCommentSuccess = (comment) => (
  {
    type: UPDATE_COMMENT_SUCCESS,
    payload: comment,
  }
);

export const updateComment = (comment) => (dispatch) => {
  Api({
    method: 'POST',
    url: 'api/comment',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { description: comment },
  }).then((response) => {
    dispatch(updateCommentSuccess(response.data));
  });
};

export const fetchCommentSuccess = (comments) => (
  {
    type: FETCH_COMMENT_SUCCESS,
    payload: comments,
  }
);

export const fetchComment = () => (dispatch) => {
  Api({
    method: 'GET',
    url: 'api/comments',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    dispatch(fetchCommentSuccess(response.data));
  });
};
