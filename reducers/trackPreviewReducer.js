import { STORE_TRACKS, END_SESSION, ADD_TRACK, SKIP_TRACK } from '../actions/trackPreviewActions';
import { SIGN_OUT } from '../actions/loginActions';

const initTrackPreview = {
  session: {},
  added: [],
  seen: {}
};

export default function reducer(state = initTrackPreview, action) {
  const { trackId } = action;
  switch (action.type) {
    case STORE_TRACKS:
      for (let trackId in action.tracks) {
        if (state.seen[trackId] === undefined) {
          state.session[trackId] = action.tracks[trackId];
        }
      }
      return {
        ...state
      };
    case ADD_TRACK:
      state.session = { ...state.session };
      state.seen = { ...state.seen };
      state.added = Array.from(state.added);
      state.seen[trackId] = null;
      state.added.push(state.session[trackId]);
      delete state.session[trackId];
      return {
        ...state
      };
    case SKIP_TRACK:
      state.session = { ...state.session };
      state.seen = { ...state.seen };
      state.seen[trackId] = null;
      delete state.session[trackId];
      return {
        ...state
      };
    case END_SESSION:
      // clear session, but retain unseen tracks
      state.session = {};
      state.added = [];
      state.seen = {};
      return {
        ...state
      };
    case SIGN_OUT:
      return initTrackPreview;
    default:
      return state;
  }
}