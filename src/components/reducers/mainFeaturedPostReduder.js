import {
  MAKE_OUT_MAIN_FEATURED_POST_SUCCESS,
  MAKE_OUT_MAIN_FEATURED_POST_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  mainFeaturedPostData: {},
  error: '',
};

export default function mainFeaturedPostReduder(state = initialState, action) {
  switch (action.type) {
    case MAKE_OUT_MAIN_FEATURED_POST_SUCCESS:
      return {
        ...state,
        mainFeaturedPostData: action.payload,
      };
    case MAKE_OUT_MAIN_FEATURED_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
