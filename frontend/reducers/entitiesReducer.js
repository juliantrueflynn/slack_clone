import { combineReducers } from 'redux';
import workspaces from './workspaceReducer';
import workspaceSubs from './workspaceSubReducer';
import channels from './channelReducer';
import channelSubs from './channelSubReducer';
import members from './userReducer';
import messages from './messageReducer';
import favorites from './favoriteReducer';
import reactions from './reactionReducer';
import unreads from './unreadReducer';
import pins from './pinReducer';

const entitiesReducer = combineReducers({
  workspaces,
  workspaceSubs,
  channels,
  channelSubs,
  members,
  messages,
  pins,
  favorites,
  reactions,
  unreads,
});

export default entitiesReducer;
