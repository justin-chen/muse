import { GENRE_TOGGLE, GENRE_SELECT_ALL, GENRE_UNSELECT_ALL } from '../actions/genreSelectActions';
import { SIGN_OUT } from '../actions/loginActions';

const initPreference = {
  pop: false,
  hiphop: false,
  workout: false,
  country: false,
  focus: false,
  chill: false,
  edm_dance: false,
  rnb: false,
  rock: false,
  indie_alt: false,
  roots: false,
  party: false,
  sleep: false,
  classical: false,
  jazz: false,
  romance: false,
  kpop: false,
  metal: false,
  soul: false,
  punk: false,
  blues: false,
  funk: false,
}
// numSelected: state.numSelected + (!state[action.genre] ? 1 : -1)
export default function reducer(state = initPreference, action) {
  switch (action.type) {
    case GENRE_TOGGLE:
      return {
        ...state,
        [action.genre]: !state[action.genre],
      };
    case GENRE_SELECT_ALL:
      const genres = { ...initPreference };
      for (let genre in genres) {
        genres[genre] = true;
      }
      return genres;
    case GENRE_UNSELECT_ALL:
    case SIGN_OUT:
      return { ...initPreference };
    default:
      return state;
  }
}