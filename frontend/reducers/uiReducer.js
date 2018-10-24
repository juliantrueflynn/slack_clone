import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayModal from './modalReducer';
import accordion from './accordionReducer';
import drawer from './drawerReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  accordion,
  drawer,
});

export default uiReducer;
