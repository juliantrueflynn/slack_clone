import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayModal from './modalReducer';
import accordion from './accordionReducer';
import drawer from './drawerReducer';
import searchQuery from './searchQueryReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  accordion,
  drawer,
  searchQuery,
});

export default uiReducer;
