import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChatPath from './chatPathDisplayReducer';
import defaultChannel from './channelDefaultReducer';
import displayModal from './modalReducer';
import accordion from './accordionReducer';
import drawer from './drawerReducer';
import dropdown from './dropdownReducer';
import isEditingMessage from './isEditingMessageReducer';

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
