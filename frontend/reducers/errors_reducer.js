import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import workspace from './workspace_errors_reducer';

const errorsReducer = combineReducers({
  session,
  workspace,
});

export default errorsReducer;