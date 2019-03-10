import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export function initializeStore(initialState) {
  return createStore(reducer, initialState, applyMiddleware(thunk));
}
