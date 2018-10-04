import { UPDATE_CART, EMPTY_CART, FETCH_TAXES, FETCH_TAXES_SUCCESS } from '../constants/ActionTypes';
const initialState = {
  cart: [],
  taxesAndDiscounts: {
    status: 0,
    messages: '',
    data: {},
  }
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
    case FETCH_TAXES:
      return {
        ...state,
        taxesAndDiscounts: {
          status: 1,
          messages: 'requesting...',
          data: {},
        }
      };
    case FETCH_TAXES_SUCCESS:
      return {
        ...state,
        taxesAndDiscounts: {
          status: 2,
          messages: 'success',
          data: action.payload,
        }
      };
    default:
      return state;
  }
}
