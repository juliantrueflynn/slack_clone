import { combineReducers } from 'redux';
import displayWorkspaceId from './workspace_display_reducer';
import displayChannelId from './channel_display_reducer';
import displayModal from './modal_reducer';
import editMessageId from './message_edit_reducer';

const uiReducer = combineReducers({
  displayWorkspaceId,
  displayChannelId,
  displayModal,
  editMessageId,
});

export default uiReducer;
