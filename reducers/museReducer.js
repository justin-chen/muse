import { combineReducers } from 'redux';
import auth from './loginReducer';
import user from './profileReducer';
import genres from './genreSelectReducer';
import tracks from './trackPreviewReducer';

const root = combineReducers({
  auth,
  user,
  genres,
  tracks,
});

export default root;