import { connect } from 'react-redux';
import MessageThread from './MessageThread';
import { getThread, getCurrentSidebarThread } from '../../reducers/selectors';

const mapStateToProps = state => ({
  threadEntries: getThread(state),
  message: getCurrentSidebarThread(state),
});

export default connect(
  mapStateToProps,
  null
)(MessageThread);