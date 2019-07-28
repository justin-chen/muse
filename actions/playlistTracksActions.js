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

  let tracks = [];
  let fetchedAll = false;
  let nextParam = params.url;
  let res;

  while (true) {
    res = await fetchAPI(nextParam, options, dispatch, refreshToken);

    tracks.push(...(res.items));

    if (res.next) {
      nextParam = res.next;
    } else {
      break;
    }
  }

  dispatch(storePlaylistTracks(tracks, params.index));
};

export const deleteTrack = (accessToken, refreshToken, playlistId, trackUri) => async dispatch => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const options = {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    method: 'DELETE',
    body: JSON.stringify({tracks: [{uri: trackUri}]}),
  };
  await fetchAPI(url, options, dispatch, refreshToken);
};
