import { fetchAPI } from '../utils/APICaller';

export const END_SESSION = 'END_SESSION';
export const endSession = () => ({
  type: END_SESSION,
});

export const ADD_TRACK = 'ADD_TRACK';
export const addTrack = trackId => ({
  type: ADD_TRACK,
  trackId
});

export const SKIP_TRACK = 'SKIP_TRACK';
export const skipTrack = trackId => ({
  type: SKIP_TRACK,
  trackId
});

export const STORE_TRACKS = 'STORE_TRACKS';
export const storeTracks = tracks => ({
  type: STORE_TRACKS,
  tracks
});

export const fetchTopArtists = (accessToken, refreshToken) => async dispatch => {
  let topArtistIds = [];

  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  // Fetch top artists
  let url = 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50';
  while (true) {
    const topArtists = await fetchAPI(url, options, dispatch, refreshToken);
    topArtistIds.push(...(topArtists.items.map(artist => artist.id)));

    if (topArtists.next) {
      url = topArtists.next;
    } else {
      break;
    }
  }

  // Fetch artists from top tracks
  url = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50'; // Should we use short term now?
  while (true) {
    const topTracks = await fetchAPI(url, options, dispatch, refreshToken);
    topArtistIds.push(...([].concat.apply([], topTracks.items.map(track => track.artists)).map(artist => artist.id)));

    if (topTracks.next) {
      url = topTracks.next;
    } else {
      break;
    }
  }

  return topArtistIds;
};

export const fetchFollowedArtists = (accessToken, refreshToken) => async dispatch => {
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  let url = 'https://api.spotify.com/v1/me/following?type=artist&limit=50';
  let followedArtistIds = [];

  while (true) {
    const followedArtists = await fetchAPI(url, options, dispatch, refreshToken);
    followedArtistIds.push(...(followedArtists.artists.items.map(artist => artist.id)));

    if (followedArtists.artists.next) {
      url = topArtists.artists.next;
    } else {
      break;
    }
  }

  return followedArtistIds;
};

export const fetchArtistsFromUserLibrary = (accessToken, refreshToken, userCountry) => async dispatch => {
  let artistIds = [];
  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  // Fetch artists from saved tracks
  let url = `https://api.spotify.com/v1/me/tracks?limit=50&market=${userCountry}`;
  while (true) {
    const savedTracks = await fetchAPI(url, options, dispatch, refreshToken);
    artistIds.push(...([].concat.apply([], savedTracks.items.map(item => item.track.artists)).map(artist => artist.id)));

    if (savedTracks.next) {
      url = savedTracks.next;
    } else {
      break;
    }
  }

  // Fetch artists from saved albums
  url = `https://api.spotify.com/v1/me/albums?limit=50&market=${userCountry}`;
  while (true) {
    const savedAlbums = await fetchAPI(url, options, dispatch, refreshToken);
    artistIds.push(...([].concat.apply([], savedAlbums.items.map(item => item.album.artists)).map(artist => artist.id)));

    if (savedAlbums.next) {
      url = savedAlbums.next;
    } else {
      break;
    }
  }

  return artistIds;
};

export const userHasEnoughData = (accessToken, refreshToken) => async dispatch => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = `https://lets-get-this-bread.appspot.com/api/has_enough_seed_data?access_token=${accessToken}`;
  const res = await fetchAPI(url, options, dispatch, refreshToken);

  return res.has_enough_data;
}

export const lastSyncedWithSpotify = (accessToken, refreshToken) => async dispatch => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = `https://lets-get-this-bread.appspot.com/api/last_synced_with_spotify?access_token=${accessToken}`;
  const res = await fetchAPI(url, options, dispatch, refreshToken);

  return res.last_synced_with_spotify;
}

export const syncUserWithSpotify = (accessToken, refreshToken, artistIds) => async dispatch => {
  const data = {
    access_token: accessToken,
    artist_ids: artistIds,
    type: "spotify",
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

export const fetchTracks = (accessToken, refreshToken, categories, limit = 10) => async dispatch => {
  const data = {
    access_token: accessToken,
    categories,
    limit
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const url = 'https://lets-get-this-bread.appspot.com/api/get_songs';
  const tracks = await fetchAPI(url, options, dispatch, refreshToken);
  dispatch(storeTracks(tracks));
};

export const fetchPersonalizedTracks = (accessToken, refreshToken, limit = 10) => async dispatch => {
  const data = {
    access_token: accessToken,
    limit
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const url = 'https://lets-get-this-bread.appspot.com/api/get_songs_from_user_pref';
  const tracks = await fetchAPI(url, options, dispatch, refreshToken);
  dispatch(storeTracks(tracks));
};
