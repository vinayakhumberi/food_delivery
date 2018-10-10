import { SET_USER_INFO, SET_USER_INFO_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  userInfo: {
    status: 0,
    messages: '',
    data: {},
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: {
          status: 1,
          messages: 'updating',
          data: {},
        },
      };
    case SET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          status: 2,
          messages: 'success',
          data: action.payload,
        },
      };
    default:
      return state;
  }
}
