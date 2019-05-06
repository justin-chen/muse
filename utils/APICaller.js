 // redeclare locally to avoid cyclical dependency
 const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
 const authenticateUserSuccess = (accessToken, refreshToken) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  accessToken,
  refreshToken,
});

const fetchAPI = async (url, options, dispatch, refreshToken, n = 5) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 200) {
      return await response.json();;
    }
    throw Error(response.status);
  } catch({ message: errorCode }) {
    // access token expired, refresh token, update store, retry request
    if (errorCode == 401) {
      const refreshUrl = `https://lets-get-this-bread.appspot.com/api/refresh_token?refresh_token=${refreshToken}`;
      const refreshResponse = await fetch(refreshUrl);
      const { access_token: accessToken } = await refreshResponse.json();
      options.headers.Authorization = `Bearer ${accessToken}`;
      if (options.body) {
        const body = JSON.parse(options.body);
        body.access_token = accessToken;
        options.body = JSON.stringify(body);
      }
      dispatch(authenticateUserSuccess(accessToken, refreshToken));
      return await fetchAPI(url, options, dispatch, refreshResponse);
    }
  }
};

export { fetchAPI };
