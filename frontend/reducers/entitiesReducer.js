import { combineReducers } from 'redux';
import workspaces from './workspaceReducer';
import channels from './channelReducer';
import members from './memberReducer';
import messages from './messageReducer';
import favorites from './favoriteReducer';

const entitiesReducer = combineReducers({
  workspaces,
  channels,
  members,
  messages,
  favorites
});

export default entitiesReducer;