import { fetchAPI } from '../utils/APICaller';

export const STORE_PROFILE = 'STORE_PROFILE';
export const storeProfile = profile => ({
  type: STORE_PROFILE,
  profile,
});

export const STORE_PLAYLISTS = 'STORE_PLAYLISTS';
export const storePlaylists = (playlists, userId) => ({
  type: STORE_PLAYLISTS,
  playlists,
  userId
});

export const fetchProfile = (accessToken, refreshToken) => async dispatch => {
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const url = 'https://api.spotify.com/v1/me';
  const userData = await fetchAPI(url, options, dispatch, refreshToken);
  dispatch(fetchPlaylists(accessToken, refreshToken, userData.id))
  dispatch(storeProfile(userData));
  return userData;
};

export const fetchPlaylists = (accessToken, refreshToken, userId) => async dispatch => {
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const url = `https://api.spotify.com/v1/users/${userId}/playlists?offset=0&limit=50`;
  const { items: playlists } = await fetchAPI(url, options, dispatch, refreshToken);
  dispatch(storePlaylists(playlists, userId));
};
