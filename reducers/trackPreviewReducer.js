import { STORE_TRACKS, END_SESSION, ADD_TRACK, SKIP_TRACK } from '../actions/trackPreviewActions';
import { GENRE_TOGGLE, GENRE_SELECT_ALL, GENRE_UNSELECT_ALL } from '../actions/genreSelectActions';
import { SIGN_OUT } from '../actions/loginActions';

const initTrackPreview = {
  genresSelected: 0,
  session: {},
  added: [],
  seen: {}
};

export default function reducer(state = initTrackPreview, action) {
  const { trackId } = action;
  const { [trackId]: value, ...updatedSession } = state.session;
  switch (action.type) {
    case GENRE_TOGGLE:
      return {
        ...state,
        genresSelected: state.genresSelected + (!state[action.genre] ? 1 : -1)
      };
    case GENRE_SELECT_ALL:
      return {
        ...state,
        genresSelected: 22
      };
    case GENRE_UNSELECT_ALL:
      return {
        ...state,
        genresSelected: 0
      };
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
        added: [...state.added, state.session[trackId]]
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
    case END_SESSION:
    case SIGN_OUT:
      return initTrackPreview;
    default:
      return state;
  }
}