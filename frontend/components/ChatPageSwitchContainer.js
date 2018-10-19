import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectChatPageMessagesBySlug, selectChatPageChannelsBySlug } from '../reducers/selectors';
import { fetchMessages, fetchUserThreads, fetchHistory } from '../actions/messageActions';
import { fetchUnreads } from '../actions/readActions';
import { loadChatPage, createChannelSub, switchChannel } from '../actions/channelActions';
import { clearUnreads } from '../actions/unreadActions';
import ChatPageSwitch from './ChatPageSwitch';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  drawerType: state.ui.drawer.drawerType,
  drawerSlug: state.ui.drawer.drawerSlug,
  users: state.entities.members,
  modal: state.ui.displayModal,
  isLoading: state.ui.isPageLoading,
  currentUser: state.session.currentUser,
  channels: selectChatPageChannelsBySlug(state, chatPath),
  messages: selectChatPageMessagesBySlug(state, chatPath),
});

const mapDispatchToProps = (dispatch, { match: { params: { workspaceSlug, chatPath } } }) => ({
  fetchEntriesRequest: () => {
    if (chatPath === 'unreads') {
      return dispatch(fetchUnreads.request(workspaceSlug));
    }

    if (chatPath === 'threads') {
      return dispatch(fetchUserThreads.request(workspaceSlug));
    }

    return dispatch(fetchMessages.request(chatPath));
  },
  loadChatPage: pagePath => dispatch(loadChatPage(pagePath)),
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  fetchHistoryRequest: (channelSlug, startDate) => (
    dispatch(fetchHistory.request(channelSlug, startDate))
  ),
  switchChannel: (channelSlug, scrollLoc) => dispatch(switchChannel(channelSlug, scrollLoc)),
  clearUnreads: (channelSlug, lastRead) => dispatch(clearUnreads(channelSlug, lastRead)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPageSwitch));
