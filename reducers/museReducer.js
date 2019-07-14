import { combineReducers } from 'redux';
import auth from './loginReducer';
import user from './profileReducer';
import genres from './genreSelectReducer';
import tracks from './trackPreviewReducer';
import playlistTracks from './playlistTracksReducer';

const root = combineReducers({
  auth,
  user,
  genres,
  tracks,
  playlistTracks
});

export default root;