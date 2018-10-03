import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayModal from './modalReducer';
import isWorkspaceLoading from './isWorkspaceLoadingReducer';
import isPageLoading from './isPageLoadingReducer';
import isDrawerLoading from './isDrawerLoadingReducer';
import drawer from './drawerReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  isWorkspaceLoading,
  isPageLoading,
  isDrawerLoading,
  drawer,
});

export default uiReducer;
