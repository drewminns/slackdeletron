import axios from 'axios';

import { FETCH_USER, FETCH_USER_ERROR, LOGIN_USER } from './types';

export const fetchUser = (history = {}) => async (dispatch, getState) => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_USER_ERROR });
    history.push('/');
  }
};

export const loginUser = (history = {}) => async (dispatch) => {
  try {
    await axios.get('/api/slack/login');
    dispatch({ type: LOGIN_USER });
  } catch (err) {
    dispatch({ type: FETCH_USER_ERROR });
  }
};
