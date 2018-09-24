import { TEST } from '../constants/ActionTypes';
import { menuRef } from "../config/firebase";

const initialState = {
  testInfo: {
    status: 0,
    messages: 'Test info',
    data: {},
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        testInfo: {
          status: 1,
          messages: 'requested',
          data: action.payload,
        },
      };
    default:
      return state;
  }
}
