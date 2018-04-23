import { connect } from 'react-redux';
import ChannelPage from './channel_page';
import { loadChannelPage } from '../../actions/channel_actions';
import { closeThread } from '../../actions/message_thread_actions';
import { getMessageById } from '../../reducers/selectors';
import { createMessage } from '../../actions/message_actions';

const mapStateToProps = state => ({
  isRightSidebarOpen: Boolean(state.ui.displayThreadId),
  thread: getMessageById(state, state.ui.displayThreadId),
});

const mapDispatchToProps = dispatch => ({
  loadChannelPage: (channelId, workspaceId) => dispatch(
    loadChannelPage(channelId, workspaceId)
  ),
  closeThread: threadId => dispatch(closeThread(threadId)),
  createMessage: message => dispatch(createMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelPage);