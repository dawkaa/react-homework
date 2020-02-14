import {
  UPDATE_NOTIFY,
  EMPTY_NOTIFY,
} from '../actions/actionTypes';

const initialState = {
  notify: false,
  notifyData: '',
};

export default function notify(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFY:
      return {
        ...state,
        notifyData: action.payload,
        notify: true,
      };
    case EMPTY_NOTIFY:
      return {
        ...state,
        notifyData: '',
        notify: false,
      };
    default:
      return state;
  }
}
