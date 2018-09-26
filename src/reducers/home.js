import { FETCH_MENU, FETCH_MENU_SUCCESS } from '../constants/ActionTypes';
// import { menuRef } from "../config/firebase";

const initialState = {
  menuItems: {
    status: 0,
    messages: '',
    data: {},
  },
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
    default:
      return state;
  }
}
