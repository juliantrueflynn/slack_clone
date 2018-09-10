import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { fetchChannel, createChannelSub } from '../actions/channelActions';
// import { updateRead } from '../actions/readActions';
import { isRightSidebarOpen, selectChatTitleBySlug } from '../reducers/selectors';
import { fetchMessages, fetchUserThreads } from '../actions/messageActions';
import { fetchUnreads } from '../actions/readActions';
import { rightSidebarClose } from '../actions/rightSidebarActions';
import ChatPage from './ChatPage';

const mapStateToProps = (state, { match: { params } }) => ({
  // entries: selectParentMessages(state),
  entries: Object.values(state.entities.messages),
  channels: Object.values(state.entities.channels),
  chatTitle: selectChatTitleBySlug(state, params.chatPath),
  channelSlug: params.channelSlug,
  messageSlug: state.ui.displayMessageSlug,
  userSlug: state.ui.displayUserSlug,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  isRightSidebarOpen: isRightSidebarOpen(state),
  users: state.entities.members,
  // workspaceId: selectWorkspaceIdBySlug(state, params.workspaceSlug),
  // channel: state.entities.channels[params.channelSlug],
  // authors: selectHashDmUsersBySlug(state, params.channelSlug),
  // currentUser: state.session.currentUser,
  // dmUsernames: selectDmUsernamesBySlug(state, params.channelSlug, false),
  // isChatSub: isUserChatSub(state),
  // currentUserId: selectCurrentUserId(state),
});

const mapDispatchToProps = (dispatch, { match: { params: { workspaceSlug, chatPath } } }) => ({
  fetchEntriesRequest: () => {
    if (chatPath === 'unreads') {
      return dispatch(fetchUnreads.request(workspaceSlug));
    }

    if (chatPath === 'threads') {
      return dispatch(fetchUserThreads.request());
    }

    return dispatch(fetchMessages.request(chatPath));
  },
  rightSidebarClose: () => dispatch(rightSidebarClose()),
  // updateReadRequest: read => dispatch(updateRead.request(read)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatPage));
