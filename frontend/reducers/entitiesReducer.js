import { combineReducers } from 'redux';
import workspaces from './workspaceReducer';
import workspaceSubs from './workspaceSubReducer';
import chatrooms from './chatroomReducer';
import chatroomSubs from './chatroomSubReducer';
import members from './userReducer';
import messages from './messageReducer';
import favorites from './favoriteReducer';
import reactions from './reactionReducer';
import unreads from './unreadReducer';
import pins from './pinReducer';

const entitiesReducer = combineReducers({
  workspaces,
  workspaceSubs,
  chatrooms,
  chatroomSubs,
  members,
  messages,
  pins,
  favorites,
  reactions,
  unreads,
});

export default entitiesReducer;
