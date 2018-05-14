import { combineReducers } from 'redux';
import workspaces from './workspaceReducer';
import channels from './channelReducer';
import members from './memberReducer';
import messages from './messageReducer';

const entitiesReducer = combineReducers({
  workspaces,
  channels,
  members,
  messages,
});

export default entitiesReducer;