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
