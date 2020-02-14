import {
  UPDATE_COMMENT_SUCCESS,
  FETCH_COMMENT_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  comments: [],
};

export default function comment(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
}
