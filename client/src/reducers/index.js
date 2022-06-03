// Root reducer
import auth from './auth';
import { combineReducers } from "redux";
import alert from './alert';
import profile from './profile';

export default combineReducers({
    alert,
    auth,
    profile
});