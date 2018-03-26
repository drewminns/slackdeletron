import { LOGIN_USER, LOGOUT_USER, ERROR_USER } from '../actions/types';

const initialState = {
  profile: {
    name: '',
    avatar: '',
  },
  loggedIn: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        profile: action.payload,
        loggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        profile: initialState.profile,
        loggedIn: false,
      };
    case ERROR_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
