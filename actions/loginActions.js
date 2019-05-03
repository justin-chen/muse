import { AuthSession } from 'expo';
import { fetchProfile } from './profileActions';

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
    dispatch(fetchProfile(accessToken, refreshToken));
    dispatch(authenticateUserSuccess(accessToken, refreshToken));
  }
}

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
  type: SIGN_OUT,
});
