import { connect } from 'react-redux';
import MessageThread from './message_thread';
import { getThreadEntries, getMessageBySlug } from '../../reducers/selectors';
import {
  editMessage,
  openEditMessage,
  closeEditMessage,
  deleteMessage,
} from '../../actions/message_actions';

const mapStateToProps = state => ({
  threadEntries: getThreadEntries(state),
  message: getMessageBySlug(state, state.ui.displayMessageSlug),
});

export default connect(
  mapStateToProps,
  null
)(MessageThread);