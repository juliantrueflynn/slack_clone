import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isRightSidebarOpen, selectChatTitleBySlug } from '../reducers/selectors';
import { fetchMessages, fetchUserThreads } from '../actions/messageActions';
import { fetchUnreads } from '../actions/readActions';
import { rightSidebarClose } from '../actions/rightSidebarActions';
import ChatPage from './ChatPage';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  messages: state.entities.messages,
  channels: state.entities.channels,
  chatTitle: selectChatTitleBySlug(state, chatPath),
  rightSidebarProps: state.ui.rightSidebar && state.ui.rightSidebar.sidebarProps,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  isRightSidebarOpen: isRightSidebarOpen(state),
  users: state.entities.members,
  currentUser: state.session.currentUser,
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
  rightSidebarClose: () => dispatch(rightSidebarClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPage));
