import { GET_LEADS, DELETE_LEAD, ADD_LEAD, CREATE_MESSAGE } from './types';
import { returnErrors } from './error';
import { csrftoken } from './csrf_token';
const url = 'http://127.0.0.1:8000/api/leads/';

// GET LEADS
export const getLeads = async (dispatch) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  const data = await response.json();
  if (response.status !== 401) {
    dispatch({ type: GET_LEADS, payload: data });
  } else {
    dispatch(returnErrors(data, response.status));
  }
};

// DELETE LEADS
export const deleteLead = async (id, dispatch) => {
  try {
    await fetch(`${url}${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      dispatch({ type: DELETE_LEAD, payload: id });
      dispatch({
        type: CREATE_MESSAGE,
        payload: { leadDeleted: 'Lead Deleted' },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// ADD LEADS
export const addLead = (data) => async (dispatch) => {
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (response.status === 400) {
    dispatch(returnErrors(result, response.status));
  } else {
    dispatch({ type: ADD_LEAD, payload: result });
    dispatch({
      type: CREATE_MESSAGE,
      payload: { leadAdded: 'Lead Added' },
    });
  }
};
