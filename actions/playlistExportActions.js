import { fetchAPI } from '../utils/APICaller';

export const addTracksToPlaylist = (accessToken, refreshToken, playlistId, tracks) => async dispatch => {
  const data = {
    uris: tracks,
  }
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const response = await fetchAPI(url, options, dispatch, refreshToken);
  // error check?  max 100 tracks ... 
};

export const createPlaylist = (accessToken, refreshToken, userId, name) => async dispatch => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  };
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const response = await fetchAPI(url, options, dispatch, refreshToken);
  // error check?
};

export const updateUserSeeds = (accessToken, refreshToken, artistIds) => async dispatch => {
  const data = {
    access_token: accessToken,
    artist_ids: artistIds,
    type: "muse",
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const url = 'https://lets-get-this-bread.appspot.com/api/sync_user_preferences';
  const res = await fetchAPI(url, options, dispatch, refreshToken);

  return res.updated;
}
