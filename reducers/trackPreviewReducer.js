import { STORE_TRACKS, END_SESSION, ADD_TRACK, SKIP_TRACK } from '../actions/trackPreviewActions';
import { DELETE_ADDED_TRACK } from '../actions/playlistPreviewActions';
import { SIGN_OUT } from '../actions/loginActions';

const initTrackPreview = {
  session: {},
  added: [],
  seen: {}
};

export default function reducer(state = initTrackPreview, action) {
  const { trackId } = action;
  const { [trackId]: value, ...updatedSession } = state.session;
  switch (action.type) {
    case STORE_TRACKS:
      const session = {};
      for (let trackId in action.tracks) {
        if (state.seen[trackId] === undefined) {
          session[trackId] = action.tracks[trackId];
        }
      }
      return {
        ...state,
        session
      };
    case ADD_TRACK:
      return {
        ...state,
        session: updatedSession,
        seen: {
          ...state.seen,
          [trackId]: "ADD"
        },
        added: [...state.added, { key: trackId, ...state.session[trackId] }]
      };
    case SKIP_TRACK:
      return {
        ...state,
        session: updatedSession,
        seen: {
          ...state.seen,
          [trackId]: "SKIP"
        }
      };
    case DELETE_ADDED_TRACK:
      return {
        ...state,
        added: [ ...state.added ].filter(track => track.key != action.key)
      };
    case END_SESSION:
    case SIGN_OUT:
      return initTrackPreview;
    default:
      return state;
  }
}