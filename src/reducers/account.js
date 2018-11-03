import {
  SET_USER_INFO,
  SET_USER_INFO_SUCCESS,
  CHECK_USER_EXIST,
  CHECK_USER_EXIST_SUCCESS,
  CHECK_USER_EXIST_ERROR,
} from '../constants/ActionTypes';

const initialState = {
  userInfo: {
    status: 0,
    messages: '',
    data: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).data : {}
  },
  isUserPresent: {
    status: 0,
    messages: '',
    data: {}
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
    case CHECK_USER_EXIST:
      return {
        ...state,
        isUserPresent: {
          status: 1,
          messages: 'requesting',
          data: false,
        },
      };
    case CHECK_USER_EXIST_SUCCESS:
      return {
        ...state,
        isUserPresent: {
          status: 2,
          messages: 'success',
          data: action.payload || {},
        },
      };
    case CHECK_USER_EXIST_ERROR:
      return {
        ...state,
        isUserPresent: {
          status: 3,
          messages: action.payload.code,
          data: false,
        },
      };
    default:
      return state;
  }
}
