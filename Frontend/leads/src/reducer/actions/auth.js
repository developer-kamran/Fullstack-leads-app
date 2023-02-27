import { returnErrors } from './error';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './types';
import { csrftoken } from './csrf_token';
const url = 'http://127.0.0.1:8000/api/auth';

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const token = getState().auth.token;
  const response = await fetch(`${url}/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  const result = await response.json();
  if (response.status !== 401) {
    dispatch({ type: USER_LOADED, payload: result });
  } else {
    dispatch(returnErrors(result, response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

export const login = async (dispatch, username, password) => {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const result = await response.json();
  if (response.status !== 400 && response.status !== 401) {
    dispatch({ type: LOGIN_SUCCESS, payload: result });
  } else {
    dispatch(returnErrors(result, response.status));
    dispatch({ type: LOGIN_FAILED });
  }
};

export const logout = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  const response = await fetch(`${url}/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
      Authorization: `Token ${token}`,
    },
  });

  if (response.status !== 400) {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_SUCCESS });
  }
};

export const register = async (dispatch, { username, email, password }) => {
  const response = await fetch(`${url}/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const result = await response.json();
  if (response.status !== 400 && response.status !== 401) {
    dispatch({ type: REGISTER_SUCCESS, payload: result });
  } else {
    dispatch(returnErrors(result, response.status));
    dispatch({ type: REGISTER_FAILED });
  }
};
