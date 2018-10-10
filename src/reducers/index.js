import { combineReducers } from 'redux';
import home from './home';
import cart from './cart';
import account from './account';

export default combineReducers({
  home,
  cart,
  account,
});
