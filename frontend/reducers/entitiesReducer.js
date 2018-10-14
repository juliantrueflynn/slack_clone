import { combineReducers } from 'redux';
import workspaces from './workspaceReducer';
import workspaceSubs from './workspaceSubReducer';
import channels from './channelReducer';
import channelSubs from './channelSubReducer';
import members from './userReducer';
import messages from './messageReducer';
import favorites from './favoriteReducer';
import reactions from './reactionReducer';
import reads from './readReducer';
import unreads from './unreadReducer';

const entitiesReducer = combineReducers({
  workspaces,
  workspaceSubs,
  channels,
  channelSubs,
  members,
  messages,
  favorites,
  reactions,
  reads,
  unreads,
});

export default entitiesReducer;
