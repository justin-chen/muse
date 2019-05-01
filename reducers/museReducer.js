import { combineReducers } from 'redux';
import auth from './loginReducer';
import genres from './genreSelectReducer';

const root = combineReducers({
  auth,
  genres
});

export default root;