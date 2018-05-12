import { connect } from 'react-redux';
import MessageThread from './message_thread';
import {
  getThread, getCurrentSidebarThread
} from '../../reducers/selectors';

const mapStateToProps = state => ({
  threadEntries: getThread(state),
  message: getCurrentSidebarThread(state),
});

export default connect(
  mapStateToProps,
  null
)(MessageThread);