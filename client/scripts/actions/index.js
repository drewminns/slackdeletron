import axios from 'axios';

import { FETCH_USER, FETCH_USER_ERROR } from './types';

export const fetchUser = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/api/profile');
      dispatch({ type: FETCH_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_USER_ERROR });
    }
  };
};
