import { UPDATE_CART, EMPTY_CART } from '../constants/ActionTypes';

export const updateCart = cart => (dispatch) => {
  dispatch({
    type: UPDATE_CART,
    payload: cart,
  });
};

export const emptyCart = () => (dispatch) => {
  dispatch({
    type: EMPTY_CART,
  });
}
