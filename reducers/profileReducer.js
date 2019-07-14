import { STORE_PROFILE, STORE_PLAYLISTS } from '../actions/profileActions';
import { STORE_PLAYLIST_TRACKS } from '../actions/playlistTracksActions';
import { SIGN_OUT } from '../actions/loginActions';

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
            tracksUrl: playlist.tracks.href,
            trackCount: playlist.tracks.total,
            thumbnail: playlist.images[0].url
          };
        });
      return {
        ...state,
        playlists
      };
    case STORE_PLAYLIST_TRACKS:
      state.playlists[action.index].tracks = [];
      action.tracks.forEach(({ track }) => {
        state.playlists[action.index].tracks.push({
          key: track.id,
          track: track.name,
          album: track.album.name,
          artists: track.artists.map(({ name }) => name),
          thumbnail: track.album.images[0].url,
          preview: track.preview_url
        })
      });
      return {
        ...state
      };
    case SIGN_OUT:
      return initProfile;
    default:
      return state;
  }
}