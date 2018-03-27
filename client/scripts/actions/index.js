import axios from 'axios';

import {
  LOGIN_USER,
  LOGOUT_USER,
  ERROR_USER,
  GET_FILES,
  GET_FILES_ERROR,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_ERROR,
} from './types';

const ENDPOINT = 'https://slack.com/api/';

export const userAuth = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');
    switch (res.data.loggedIn) {
      case true:
        return dispatch({ type: LOGIN_USER, payload: res.data.profile });
      case false:
        return dispatch({ type: LOGOUT_USER });
      default:
        return dispatch({ type: ERROR_USER });
    }
  } catch (err) {
    dispatch({ type: ERROR_USER });
  }
};

export const getFiles = (
  from = null,
  to = null,
  types = null,
  channel = null
) => async (dispatch, getState) => {
  const data = await getState();

  if (!data.auth.loggedIn) {
    return dispatch({ type: GET_FILES_ERROR });
  }
  const res = await axios.get(`${ENDPOINT}files.list`, {
    params: {
      token: data.auth.profile.accessToken,
      from,
      to,
      types,
      channel,
    },
  });
  return dispatch({ type: GET_FILES, files: res.data.files });
};

export const deleteFile = (id = null) => async (dispatch, getState) => {
  const data = await getState();
  if (!id || !data.auth.loggedIn) {
    return dispatch({ type: DELETE_FILE_ERROR });
  }

  try {
    await axios.get(`${ENDPOINT}files.delete`, {
      params: {
        token: data.auth.profile.accessToken,
        file: id,
      },
    });

    return dispatch({ type: DELETE_FILE_SUCCESS, payload: id });
  } catch (err) {
    return dispatch({ type: DELETE_FILE_ERROR });
  }
};
