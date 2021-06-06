import { combineReducers } from 'redux';

import todolist from './todo-list.js';
import auth from './auth.js';
import snackbar from './snackbar.js';


export default combineReducers({ todolist, authentication: auth, snackbar });