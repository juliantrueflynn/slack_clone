import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isRightSidebarOpen, selectChatTitleBySlug } from '../reducers/selectors';
import { fetchMessages, fetchUserThreads } from '../actions/messageActions';
import { fetchUnreads } from '../actions/readActions';
import { loadChatPage } from '../actions/channelActions';
import { rightSidebarClose } from '../actions/rightSidebarActions';
import ChatPage from './ChatPage';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  chatTitle: selectChatTitleBySlug(state, chatPath),
  rightSidebarProps: state.ui.rightSidebar && state.ui.rightSidebar.sidebarProps,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  isRightSidebarOpen: isRightSidebarOpen(state),
  users: state.entities.members,
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPage));
