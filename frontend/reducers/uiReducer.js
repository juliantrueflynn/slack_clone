import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayModal from './modalReducer';
import rightSidebar from './rightSidebarReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  rightSidebar,
});

export default uiReducer;
