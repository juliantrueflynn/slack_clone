import { combineReducers } from 'redux';
import displayWorkspaceId from './workspace_display_reducer';
import displayChannelId from './channel_display_reducer';

const uiReducer = combineReducers({
  displayWorkspaceId,
  displayChannelId,
});

export default uiReducer;
