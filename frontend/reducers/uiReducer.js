import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayModal from './modalReducer';
import rightSidebar from './sidebarReducer';
import isFetching from './isFetchingReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  rightSidebar,
  isFetching,
});

export default uiReducer;
