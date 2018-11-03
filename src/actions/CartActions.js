import {
  UPDATE_CART,
  EMPTY_CART,
  UPDATE_HANDBAG,
  FETCH_TAXES,
  FETCH_TAXES_SUCCESS,
  PLACE_ORDER,
  PLACE_ORDER_SUCCESS,
  SET_USER_INFO_SUCCESS,
} from '../constants/ActionTypes';
import { taxesRef, ordersRef, userDetailRef } from "../config/firebase";

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

export const placeAnOrder = (data, userInfo) => (dispatch) => {
  dispatch({
    type: PLACE_ORDER,
  });
  const newPostKey = ordersRef.push().key;
  const params = data;
  params.id = newPostKey;
  let orders = userInfo.orders || {};
  let user = userInfo;
  orders[params.orderDate] = ((orders[params.orderDate]
    && Object.keys(orders[params.orderDate]).length)) ? orders[params.orderDate] : {};
  orders[params.orderDate][newPostKey] = params;
  user.orders = orders;
  userDetailRef(userInfo.id).update({ orders });
  dispatch({
    type: SET_USER_INFO_SUCCESS,
    payload: user,
  });
  const user_temp = Object.assign({}, user);
  delete user_temp["orders"];
  const _orders = Object.assign({}, params);
  _orders.userInfo = user_temp;
  ordersRef.child(newPostKey).update(_orders);
  dispatch({
    type: PLACE_ORDER_SUCCESS,
    payload: {},
  });
  dispatch({
    type: EMPTY_CART,
    payload: {},
  });
  dispatch({
    type: UPDATE_HANDBAG,
    payload: {},
  });
}
