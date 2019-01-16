import { connect } from 'react-redux';
import {
  getChatroomsMap,
  getChatViewChannels,
  getMessagesMap,
  getAllThreadViewMessages,
  getDrawerPath,
  getChatroomViewMessages,
} from '../reducers/selectors';
import {
  fetchMessages,
  createMessage,
  fetchUserThreads,
} from '../actions/messageActions';
import {
  updateDrawer,
  updateModal,
  updateScrollLocation,
  updateChatPath,
} from '../actions/uiActions';
import { createChatroomSub } from '../actions/chatroomActions';
import { clearAllUnread, fetchUnreads } from '../actions/readActions';
import ChatroomSwitch from '../components/ChatroomSwitch';

const mapStateToProps = (state, { match: { params: { chatroomSlug } } }) => {
  const chatroom = getChatroomsMap(state)[chatroomSlug];
  let messages = [];

  if (chatroomSlug === 'unreads') {
    messages = getMessagesMap(state);
  } else if (chatroomSlug === 'threads') {
    messages = getAllThreadViewMessages(state);
  } else {
    messages = getChatroomViewMessages(state);
  }

  const { drawerType } = state.ui.drawer;
  let drawerPath = getDrawerPath(state);

  if (chatroom && drawerType === 'details') {
    drawerPath = '';
  }

  return {
    usersMap: state.entities.members,
    currentUser: state.session.currentUser,
    isLoading: state.isLoading,
    drawerPath,
    chatroomSlug,
    chatroom,
    messages,
    unreadsMap: state.entities.unreads,
    chatrooms: getChatViewChannels(state),
  };
};

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  updateChatPath: () => dispatch(updateChatPath(params.chatroomSlug)),
  fetchChatPageData: () => {
    let slug = params.workspaceSlug;
    let fetchChatPage;

    if (params.chatroomSlug === 'unreads') {
      fetchChatPage = fetchUnreads;
    } else if (params.chatroomSlug === 'threads') {
      fetchChatPage = fetchUserThreads;
    } else {
      slug = params.chatroomSlug;
      fetchChatPage = fetchMessages;
    }

    return dispatch(fetchChatPage.request(slug));
  },
  createChatroomSubRequest: chatroomId => (
    dispatch(createChatroomSub.request({ chatroomSlug: params.chatroomSlug, chatroomId }))
  ),
  fetchHistoryRequest: lastId => (
    dispatch(fetchMessages.request(params.chatroomSlug, lastId))
  ),
  updateScrollLocation: (chatroomSlug, scrollLoc) => (
    dispatch(updateScrollLocation(chatroomSlug, scrollLoc))
  ),
  clearAllUnread: (chatroomSlug, lastRead) => dispatch(clearAllUnread(chatroomSlug, lastRead)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openModal: modalType => dispatch(updateModal(modalType, null)),
  createMessageRequest: message => dispatch(createMessage.request(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomSwitch);
