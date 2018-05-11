import { connect } from 'react-redux';
import Message from './message';
import {
  editMessage,
  openEditMessage,
  closeEditMessage,
  deleteMessage,
  deleteMessageSuccess
} from '../../actions/message_actions';

import { openThread } from '../../actions/message_thread_actions';

const mapStateToProps = state => ({
  editSlug: state.ui.editMessageSlug,
  isEditing: Boolean(state.ui.editMessageSlug),
  currentUserId: state.session.currentUser.id,
});

const mapDispatchToProps = dispatch => ({
  editMessage: message => dispatch(editMessage(message)),
  openEditMessage: message => dispatch(openEditMessage(message)),
  closeEditMessage: () => dispatch(closeEditMessage()),
  deleteMessage: messageSlug => dispatch(deleteMessage(messageSlug)),
  openThread: MessageSlug => dispatch(openThread(MessageSlug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);