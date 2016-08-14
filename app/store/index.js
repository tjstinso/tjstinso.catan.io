import { createStore, combineReducers } from 'redux';
import gameOptions from './reducers/gameOptions';
import map from './reducers/map';
import view from './reducers/view';

export default combineReducers({
  gameOptions,
  map,
  view,
});

