import { FETCH_MENU, FETCH_MENU_SUCCESS, UPDATE_HANDBAG } from '../constants/ActionTypes';
import { menuRef } from "../config/firebase";

export const fetchMenu = () => (dispatch) => {
  dispatch({
    type: FETCH_MENU
  });
  menuRef.on("value", snapshot => {
    dispatch({
      type: FETCH_MENU_SUCCESS,
      payload: snapshot.val()
    });
  });
};

export const updateHandBag = (param) => (dispatch) => {
  dispatch({
    type: UPDATE_HANDBAG,
    payload: param,
  });
};