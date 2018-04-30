import { connect } from 'react-redux';
import MessageThread from './message_thread';
import { getThreadEntries, getMessageById } from '../../reducers/selectors';
import {
  editMessage,
  openEditMessage,
  closeEditMessage,
  deleteMessage,
  deleteMessageSuccess
} from '../../actions/message_actions';

const mapStateToProps = state => ({
  threadEntries: getThreadEntries(state),
  message: getMessageById(state, state.ui.displayThreadId),
  editId: state.ui.editMessageId,
  isEditing: Boolean(state.ui.editMessageId),
  currentUserId: state.session.currentUser.id,
});

const mapDispatchToProps = dispatch => ({
  openEditMessage: message => dispatch(openEditMessage(message)),
  closeEditMessage: () => dispatch(closeEditMessage()),
  editMessage: message => dispatch(editMessage(message)),
  deleteMessage: messageId => dispatch(deleteMessage(messageId)),
  deleteMessageSuccess: messageId => dispatch(deleteMessageSuccess(messageId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageThread);