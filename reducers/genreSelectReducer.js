import { GENRE_TOGGLE, GENRE_SELECT_ALL, GENRE_UNSELECT_ALL } from '../actions/genreSelectActions';
import { SIGN_OUT } from '../actions/loginActions';

const initPreference = {
  genresSelected: 0,
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

const allSelected = {
  genresSelected: 22,
  pop: true,
  hiphop: true,
  workout: true,
  country: true,
  focus: true,
  chill: true,
  edm_dance: true,
  rnb: true,
  rock: true,
  indie_alt: true,
  roots: true,
  party: true,
  sleep: true,
  classical: true,
  jazz: true,
  romance: true,
  kpop: true,
  metal: true,
  soul: true,
  punk: true,
  blues: true,
  funk: true,
}

export default function reducer(state = initPreference, action) {
  switch (action.type) {
    case GENRE_TOGGLE:
      return {
        ...state,
        [action.genre]: !state[action.genre],
        genresSelected: state.genresSelected + (!state[action.genre] ? 1 : -1)
      };
    case GENRE_SELECT_ALL:
      return allSelected;
    case GENRE_UNSELECT_ALL:
      return initPreference;
    default:
      return state;
  }
}