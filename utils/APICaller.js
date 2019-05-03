import { authenticateUserSuccess } from '../actions/loginActions';

const fetchAPI = async (url, options, dispatch, refreshToken, n = 5) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
      return await response.json();
    }
    throw Error(response.status);
  } catch({ message: errorCode }) {
    // access token expired, refresh token, update store, retry request
    if (errorCode === 401) {
      const refreshUrl = `https://lets-get-this-bread.appspot.com/api/refresh_token?refresh_token=${refreshToken}`;
      const refreshResponse = await fetch(refreshUrl);
      const { access_token } = await refreshResponse.json();
      fetchAPI(url, options, dispatch, refreshResponse);
      dispatch(authenticateUserSuccess(access_token, refreshToken));
    }
  }
};

export { fetchAPI };
