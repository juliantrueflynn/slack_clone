import { combineReducers } from 'redux';
import workspaces from './workspaceReducer';
import channels from './channelReducer';
import channelSubs from './channelSubReducer';
import members from './memberReducer';
import messages from './messageReducer';
import favorites from './favoriteReducer';
import reactions from './reactionReducer';

const entitiesReducer = combineReducers({
  workspaces,
  channels,
  channelSubs,
  members,
  messages,
  favorites,
  reactions,
});

export default entitiesReducer;
