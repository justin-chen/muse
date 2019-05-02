import { combineReducers } from 'redux';
import auth from './loginReducer';
import user from './profileReducer';
import genres from './genreSelectReducer';

const root = combineReducers({
  auth,
  user,
  genres
});

export default root;