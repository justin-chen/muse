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

export const fetchProfile = accessToken => async dispatch => {
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const userData = await fetch('https://api.spotify.com/v1/me', options);
  const userDataJson = await userData.json();
  dispatch(fetchPlaylists(accessToken, userDataJson.id))
  dispatch(storeProfile(userDataJson));
  return userDataJson;
};

export const fetchPlaylists = (accessToken, userId) => async dispatch => {
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const playlistData = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?offset=0&limit=50`, options);
  const { items: playlists } = await playlistData.json();
  dispatch(storePlaylists(playlists, userId));
};