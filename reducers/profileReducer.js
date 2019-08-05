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
      const playlistsUpdated = state.playlists.map((playlist, index) => {
        if (action.index == index) {
          return {
            ...playlist,
            tracks: action.tracks.map(({ track }) => {
              return ({
                key: track.id,
                name: track.name,
                album: track.album.name,
                artists: track.artists.map(({ name }) => name),
                artwork: track.album.images.map(image => image.url),
                preview_url: track.preview_url,
                uri: track.uri
              })
            })
          }
        }
        return playlist;
      })
      
      return {
        ...state,
        playlists: playlistsUpdated
      };
    case SIGN_OUT:
      return initProfile;
    default:
      return state;
  }
}