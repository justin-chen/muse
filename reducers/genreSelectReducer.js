import { GENRE_TOGGLE } from '../actions/genreSelectActions';

const initCheckedGenres = {
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
};

export default function reducer(state = initCheckedGenres, action) {
  switch (action.type) {
    case GENRE_TOGGLE:
      state[action.genre] = !state[action.genre];
      return {
        ...state,
      };
    default:
      return state;
  }
}