import { userRef, userDetailRef } from "../config/firebase";
import {
  SET_USER_INFO,
  SET_USER_INFO_SUCCESS,
  CHECK_USER_EXIST,
  CHECK_USER_EXIST_SUCCESS,
  CHECK_USER_EXIST_ERROR,
} from '../constants/ActionTypes';

export const createNewUser = params => (dispatch) => {
  dispatch({
    type: SET_USER_INFO,
  });
  const postParams = {};
  postParams[params.mobile] = params;
  if (params.newLogin) {
    userRef.update(postParams);
  }
  dispatch({
    type: SET_USER_INFO_SUCCESS,
    payload: params,
  });
};

export const checkUserPresent = param => (dispatch) => {
  dispatch({
    type: CHECK_USER_EXIST,
  });
  userDetailRef(param).on("value", (snapshot) => {
    const data = snapshot.val();
    dispatch({
      type: CHECK_USER_EXIST_SUCCESS,
      payload: data
    });
  }, (error) => {
    dispatch({
      type: CHECK_USER_EXIST_ERROR,
      payload: error
    });
  });
}
