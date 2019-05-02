import { AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE, SIGN_OUT } from '../actions/loginActions';

const initAuth = {
  access_token: null,
  refresh_token: null,
  error: false,
};

export default function reducer(state = initAuth, action) {
  switch (action.type) {
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        access_token: action.accessToken,
        refresh_token: action.refreshToken,
      };
    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        error: true,
      };
    case SIGN_OUT:
      return initAuth;
    default:
      return state;
  }
}