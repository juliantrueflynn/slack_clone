import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  selectChatTitleBySlug,
  selectChatMessagesBySlug,
  selectChatChannelsBySlug,
} from '../reducers/selectors';
import { fetchMessages, fetchUserThreads } from '../actions/messageActions';
import { fetchUnreads } from '../actions/readActions';
import { loadChatPage, createChannelSub } from '../actions/channelActions';
import { rightSidebarClose } from '../actions/rightSidebarActions';
import { clearUnreads } from '../actions/unreadActions';
import ChatPage from './ChatPage';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  chatTitle: selectChatTitleBySlug(state, chatPath),
  rightSidebarProps: state.ui.rightSidebar.sidebarProps,
  users: state.entities.members,
  modal: state.ui.displayModal,
  isLoading: state.ui.isPageLoading,
  channels: selectChatChannelsBySlug(state, chatPath),
  currentUser: state.session.currentUser,
  messages: selectChatMessagesBySlug(state, chatPath),
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
  rightSidebarClose: () => dispatch(rightSidebarClose()),
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  clearUnreads: channelSlug => dispatch(clearUnreads(channelSlug)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPage));
