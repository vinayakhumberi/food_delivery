import { FETCH_MENU, FETCH_MENU_SUCCESS, UPDATE_HANDBAG } from '../constants/ActionTypes';
// import { menuRef } from "../config/firebase";

const initialState = {
  menuItems: {
    status: 0,
    messages: '',
    data: {},
  },
  handBag: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MENU:
      return {
        ...state,
        menuItems: {
          status: 1,
          messages: 'requesting',
          data: {},
        },
      };
    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        menuItems: {
          status: 2,
          messages: 'success',
          data: action.payload,
        },
      };
    case UPDATE_HANDBAG:
      return {
        ...state,
        handBag: action.payload,
      };
    default:
      return state;
  }
}
