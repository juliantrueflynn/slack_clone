import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChannelSlug from './channelDisplayReducer';
import displayModal from './modalReducer';
import accordion from './accordionReducer';
import drawer from './drawerReducer';
import dropdown from './dropdownReducer';
import isEditingMessage from './isEditingMessageReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  accordion,
  drawer,
  dropdown,
  isEditingMessage,
});

export default uiReducer;
