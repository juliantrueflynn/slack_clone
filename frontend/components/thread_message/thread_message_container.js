import { connect } from 'react-redux';
import ThreadMessage from './thread_message';
import {
  editMessage,
  openEditMessage,
  closeEditMessage,
  deleteMessage,
  deleteMessageSuccess
} from '../../actions/message_actions';

const mapStateToProps = state => ({
  editSlug: state.ui.editMessageSlug,
  isEditing: Boolean(state.ui.editMessageSlug),
  currentUserSlug: state.session.currentUser.slug
});

const mapDispatchToProps = dispatch => ({
  editMessage: message => dispatch(editMessage(message)),
  openEditMessage: message => dispatch(openEditMessage(message)),
  closeEditMessage: () => dispatch(closeEditMessage()),
  deleteMessage: messageSlug => dispatch(deleteMessage(messageSlug))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadMessage);