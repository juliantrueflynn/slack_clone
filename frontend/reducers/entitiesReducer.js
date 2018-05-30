import { combineReducers } from 'redux';
import workspaces from './workspaceReducer';
import channels from './channelReducer';
import members from './memberReducer';
import messages from './messageReducer';
import favorites from './favoriteReducer';
import reactions from './reactionReducer';

const entitiesReducer = combineReducers({
  workspaces,
  channels,
  members,
  messages,
  favorites,
  reactions
});

export default entitiesReducer;