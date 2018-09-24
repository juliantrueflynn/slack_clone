import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayMessageSlug from './messageDisplayReducer';
import displayUserSlug from './displayUserSlugReducer';
import displayModal from './modalReducer';
import isWorkspaceLoading from './isWorkspaceLoadingReducer';
import isPageLoading from './isPageLoadingReducer';
import rightSidebar from './rightSidebarReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayMessageSlug,
  displayUserSlug,
  displayModal,
  isWorkspaceLoading,
  isPageLoading,
  rightSidebar,
});

export default uiReducer;
