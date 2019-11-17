import { combineReducers } from 'redux';

import tasks from './tasks';
import params from './params';
import auth from './auth';
import errors from './errors';
import form from './form';
import notification from './notification';

export default combineReducers({
  tasks,
  params,
  auth,
  errors,
  form,
  notification,
});
