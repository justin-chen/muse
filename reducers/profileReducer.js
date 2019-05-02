import { STORE_PROFILE, STORE_PLAYLISTS } from '../actions/profileActions';

const initProfile = {
  profile: {},
  playlists: {},
};

export default function reducer(state = initProfile, action) {
  switch (action.type) {
    case STORE_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case STORE_PLAYLISTS:
      const playlists = action.playlists
        .filter(playlist => (playlist.owner.id === action.userId && playlist.tracks.total))
        .map(playlist => {
          return {
            key: playlist.id,
            name: playlist.name,
            trackCount: playlist.tracks.total,
            thumbnail: playlist.images[0].url
          };
        });
      return {
        ...state,
        playlists
      };
    default:
      return state;
  }
}