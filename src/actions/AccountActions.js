import { userRef } from "../config/firebase";
import { SET_USER_INFO, SET_USER_INFO_SUCCESS } from '../constants/ActionTypes';

export const setUserInfo = params => (dispatch) => {
  dispatch({
    type: SET_USER_INFO,
  });
  const postParams = {};
  postParams[params.mobile] = params;
  // userRef.set(postParams);
  dispatch({
    type: SET_USER_INFO_SUCCESS,
    payload: params,
  });
};
