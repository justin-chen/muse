import { fetchAPI } from '../utils/APICaller';

export const STORE_PLAYLIST_TRACKS = 'STORE_PLAYLIST_TRACKS';
export const storePlaylistTracks = (tracks, index) => ({
  type: STORE_PLAYLIST_TRACKS,
  tracks,
  index
});

export const fetchPlaylistTracks = (accessToken, refreshToken, params) => async dispatch => {
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const { items: tracks } = await fetchAPI(params.url, options, dispatch, refreshToken);
  dispatch(storePlaylistTracks(tracks, params.index));
};
