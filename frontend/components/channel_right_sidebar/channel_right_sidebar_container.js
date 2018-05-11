import { connect } from 'react-redux';
import ChannelRightSidebar from './channel_right_sidebar';
import { createMessage } from '../../actions/message_actions';
import { closeThread } from '../../actions/message_thread_actions';

const mapStateToProps = state => ({
  isRightSidebarOpen: Boolean(state.ui.displayMessageSlug),
});

const mapDispatchToProps = dispatch => ({
  closeThread: () => dispatch(closeThread()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelRightSidebar);