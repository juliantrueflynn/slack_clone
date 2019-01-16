import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspaceDisplayReducer';
import displayChatroomSlug from './chatroomSlugDisplayReducer';
import defaultChatroomSlug from './chatroomSlugDefaultReducer';
import displayModal from './modalReducer';
import accordion from './accordionReducer';
import drawer from './drawerReducer';
import dropdown from './dropdownReducer';
import isEditingMessage from './isEditingMessageReducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChatroomSlug,
  displayModal,
  accordion,
  drawer,
  dropdown,
  isEditingMessage,
  defaultChatroomSlug,
});

export default uiReducer;
