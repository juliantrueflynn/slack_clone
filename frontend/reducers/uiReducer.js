import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayModal from './modalReducer';
import editMessageSlug from './messageEditReducer';
import rightSidebar from './rightSidebarReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  editMessageSlug,
  rightSidebar,
});

export default uiReducer;
