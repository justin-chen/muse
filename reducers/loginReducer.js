import { AUTHENTICATE_USER_SUCCESS, AUTHENTICATE_USER_FAILURE } from '../actions/loginActions';

const initAuth = {
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
    default:
      return state;
  }
}