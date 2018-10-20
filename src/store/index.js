import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from '../reducers';
import { manageSessions } from '../middlewares/localStorageMiddleware';

const initialState = {};
const middleware = [thunk, logger, manageSessions];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  ),
);

export default store;
