import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChatPath from './displayChatPathReducer';
import displayModal from './modalReducer';
import accordion from './accordionReducer';
import drawer from './drawerReducer';
import dropdown from './dropdownReducer';
import isEditingMessage from './isEditingMessageReducer';
import defaultChannel from './defaultChannelReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChatPath,
  displayModal,
  accordion,
  drawer,
  dropdown,
  isEditingMessage,
  defaultChannel,
});

export default uiReducer;
