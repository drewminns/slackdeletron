import axios from 'axios';

import { LOGIN_USER, LOGOUT_USER, ERROR_USER } from './types';

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
