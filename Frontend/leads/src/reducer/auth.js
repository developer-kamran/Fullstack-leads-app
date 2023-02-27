import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADING,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  if (action.type === USER_LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === USER_LOADED) {
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user: action.payload,
    };
  }
  if (
    action.type === AUTH_ERROR ||
    action.type === LOGOUT_SUCCESS ||
    action.type === LOGIN_FAILED ||
    action.type === REGISTER_FAILED
  ) {
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }
  if (action.type === LOGIN_SUCCESS || action.type === REGISTER_SUCCESS) {
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      ...action.payload,
      isAuthenticated: true,
      isLoading: false,
    };
  }

  return state;
}
