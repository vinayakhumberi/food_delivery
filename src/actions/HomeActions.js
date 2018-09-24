import { TEST } from '../constants/ActionTypes';
import { menuRef } from "../config/firebase";

export const testAction = () => (dispatch) => {
  menuRef.on("value", snapshot => {
    dispatch({
      type: TEST,
      payload: snapshot.val()
    });
  });
};
