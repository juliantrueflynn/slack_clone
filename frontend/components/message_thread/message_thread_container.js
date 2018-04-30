import { connect } from 'react-redux';
import MessageThread from './message_thread';
import { getThreadEntries, getMessageById } from '../../reducers/selectors';

const mapStateToProps = state => ({
  threadEntries: getThreadEntries(state),
  thread: getMessageById(state, state.ui.displayThreadId),
});

export default connect(
  mapStateToProps,
  null
)(MessageThread);