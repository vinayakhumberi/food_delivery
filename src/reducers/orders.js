import { FETCH_ORDERS, FETCH_ORDERS_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  orderItems: {
    status: 0,
    messages: '',
    data: {},
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orderItems: {
          status: 1,
          messages: 'requesting',
          data: {},
        },
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orderItems: {
          status: 2,
          messages: 'success',
          data: action.payload,
        },
      };
    default:
      return state;
  }
}
