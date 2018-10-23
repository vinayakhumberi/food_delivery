export const manageSessions = store => next => action => {
  if (action.type === 'SET_USER_INFO_SUCCESS') {
    // console.log('local storage updated!', { data: action.payload });
    localStorage.setItem("userInfo", JSON.stringify({ data: action.payload }));
  }
  next(action);
}
export default {
  manageSessions,
};