import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspace_display_reducer';
import displayChannelSlug from './channel_display_reducer';
import displayModal from './modal_reducer';
import editMessageSlug from './message_edit_reducer';
import rightSidebar from './right_sidebar_reducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  editMessageSlug,
  rightSidebar,
});

export default uiReducer;
