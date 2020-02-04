import {
  MAKE_OUT_MAIN_FEATURED_POST_SUCCESS,
  MAKE_OUT_MAIN_FEATURED_POST_FAILURE,
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
