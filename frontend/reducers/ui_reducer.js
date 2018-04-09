import { combineReducers } from 'redux';
import displayWorkspaceId from './workspace_display_reducer';

const uiReducer = combineReducers({
  displayWorkspaceId,
});

export default uiReducer;
