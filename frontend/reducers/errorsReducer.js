import { combineReducers } from 'redux';
import session from './sessionErrorsReducer';
import workspace from './workspaceErrorsReducer';
import channel from './channelErrorsReducer';
import message from './messageErrorsReducer';

const errorsReducer = combineReducers({
  session,
  workspace,
  channel,
  message
});

export default errorsReducer;
