import { FETCH_USER, FETCH_USER_ERROR } from '../actions/types';

const initialState = {
  profile: null,
  loggedIn: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        profile: action.payload,
        loggedIn: true,
      };
    case FETCH_USER_ERROR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
