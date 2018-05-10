import { combineReducers } from 'redux';
import displayWorkspaceSlug from './workspace_display_reducer';
import displayChannelSlug from './channel_display_reducer';
import displayModal from './modal_reducer';
import editMessageId from './message_edit_reducer';
import displayThreadId from './message_thread_reducer';

const uiReducer = combineReducers({
  displayWorkspaceSlug,
  displayChannelSlug,
  displayModal,
  editMessageId,
  displayThreadId,
});

export default uiReducer;
