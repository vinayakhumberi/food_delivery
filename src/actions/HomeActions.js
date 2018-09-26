import { FETCH_MENU, FETCH_MENU_SUCCESS } from '../constants/ActionTypes';
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
