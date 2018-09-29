import { UPDATE_CART, EMPTY_CART } from '../constants/ActionTypes';
const initialState = {
  cart: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}