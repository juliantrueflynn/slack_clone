import { connect } from 'react-redux';
import MessageEntries from './message_entries';
import { getMessages } from '../../reducers/selectors';
import {
  editMessage,
  openEditMessage,
  closeEditMessage,
  deleteMessage,
  deleteMessageSuccess
} from '../../actions/message_actions';

const mapStateToProps = state => ({
  messages: getMessages(state),
  editId: state.ui.editMessageId,
  isEditing: Boolean(state.ui.editMessageId),
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
)(MessageEntries);