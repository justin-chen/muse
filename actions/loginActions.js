import { AuthSession } from 'expo';

// export const STORE_TOKENS = 'STORE_TOKENS';
// export const storeTokens = (accessToken, refreshToken) => ({
//   type: STORE_TOKENS,
//   accessToken,
//   refreshToken,
// });

// export const STORE_PROFILE = 'STORE_PROFILE';
// export const storeProfile = profile => ({
//   type: STORE_PROFILE,
//   profile,
// });

// export const fetchProfile = accessToken => dispatch => {
//   const url = 'http://localhost:5000/api/fetch_user';
//   const options = {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       access_token: accessToken
//     }),
//   };
//   fetch(url, options)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       console.log(`Error retrieving profile: ${response.status} ${response.statusText}`);
//     })
//     .then(profile => {
//       dispatch(storeProfile(profile));
//     });
// };

// export const authenticateUser = (accessToken, refreshToken) => dispatch => {
//   dispatch(storeTokens(accessToken, refreshToken));
//   dispatch(fetchProfile(accessToken));
// };

export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const authenticateUserSuccess = (accessToken, refreshToken) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  accessToken,
  refreshToken,
});

export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';
export const authenticateUserFailure = () => ({
  type: AUTHENTICATE_USER_FAILURE,
});

export const authenticateUser = () => async dispatch => {
  let result = await AuthSession.startAsync({
    authUrl: 'https://lets-get-this-bread.appspot.com/api/login',
  });
  if (result.type !== 'success') {
    dispatch(authenticateUserFailure);
  } else {
    const accessToken = result.params.access_token;
    const refreshToken = result.params.refresh_token;
    dispatch(authenticateUserSuccess(accessToken, refreshToken));
  }
}