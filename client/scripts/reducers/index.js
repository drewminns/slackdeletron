import { combineReducers } from 'redux';
import authReducer from './authReducer';
import filesReducer from './filesReducer';

export default combineReducers({
  auth: authReducer,
  files: filesReducer,
});
