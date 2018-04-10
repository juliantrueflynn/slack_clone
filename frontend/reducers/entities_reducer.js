import { combineReducers } from 'redux';
import workspaces from './workspace_reducer';
import channels from './channel_reducer';
import members from './member_reducer';
import messages from './message_reducer';

const entitiesReducer = combineReducers({
  workspaces,
  channels,
  members,
  messages,
});

export default entitiesReducer;