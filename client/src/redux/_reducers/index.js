import { combineReducers } from 'redux'
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import customerReducer from './customerReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  customer: customerReducer
});