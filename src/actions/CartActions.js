import { UPDATE_CART, EMPTY_CART, FETCH_TAXES, FETCH_TAXES_SUCCESS } from '../constants/ActionTypes';
import { taxesRef } from "../config/firebase";

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

export const fetchTaxesAndDiscounts = () => (dispatch) => {
  dispatch({
    type: FETCH_TAXES,
  });
  taxesRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TAXES_SUCCESS,
      payload: snapshot.val()
    });
  });
}
