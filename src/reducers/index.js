import { combineReducers } from 'redux';
import home from './home';
import cart from './cart';
import account from './account';
import orders from './orders';

export default combineReducers({
  home,
  cart,
  orders,
  account,
});
