import { FETCH_ORDERS, FETCH_ORDERS_SUCCESS } from '../constants/ActionTypes';
import { ordersRef } from "../config/firebase";

export const fetchOrders = () => (dispatch) => {
  dispatch({
    type: FETCH_ORDERS
  });
  ordersRef.on("value", snapshot => {
    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: snapshot.val()
    });
  });
};
