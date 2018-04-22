import { connect } from 'react-redux';
import MessageEntries from './message_entries';
import { getMessages } from '../../reducers/selectors';
import {
  editMessage, openEditMessage, closeEditMessage
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageEntries);