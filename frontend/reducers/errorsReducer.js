import { combineReducers } from 'redux';
import session from './sessionErrorsReducer';
import workspace from './workspaceErrorsReducer';
import channel from './channelErrorsReducer';

const errorsReducer = combineReducers({
  session,
  workspace,
  channel
});

export default errorsReducer;