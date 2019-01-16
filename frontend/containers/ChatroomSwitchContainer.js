import { connect } from 'react-redux';
import {
  getChatroomsMap,
  getChatViewChannels,
  getMessagesMap,
  getAllThreadViewMessages,
  getDrawerPath,
} from '../reducers/selectors';
import {
  updateDrawer,
  updateModal,
  updateScrollLocation,
  updateChatroomPath,
} from '../actions/uiActions';
import { fetchMessages, fetchUserThreads, createMessage } from '../actions/messageActions';
import { createChatroomSub } from '../actions/chatroomActions';
import { clearAllUnread, fetchUnreads } from '../actions/readActions';
import ChatroomSwitch from '../components/ChatroomSwitch';

const mapStateToProps = (state, { match: { params } }) => {
  const { workspaceSlug, chatroomSlug } = params;
  const chatroom = getChatroomsMap(state)[chatroomSlug];
  let messages = [];

  if (chatroomSlug === 'unreads') {
    messages = getMessagesMap(state);
  }

  if (chatroomSlug === 'threads') {
    messages = getAllThreadViewMessages(state);
  }

  const { drawerType } = state.ui.drawer;
  let drawerPath = getDrawerPath(state);

  if (chatroom && drawerType === 'details') {
    drawerPath = '';
  }

  return {
    chatrooms: getChatViewChannels(state),
    chatroomSlug,
    chatroom,
    currentUser: state.session.currentUser,
    drawerPath,
    messages,
    isLoading: state.isLoading.chatroom,
    unreadsMap: state.entities.unreads,
    usersMap: state.entities.members,
    workspaceSlug,
  };
};

const mapDispatchToProps = (dispatch, { match: { params } }) => {
  const { workspaceSlug, chatroomSlug } = params;

  return {
    updateChatroomPath: () => dispatch(updateChatroomPath(chatroomSlug)),
    fetchChatroomData: () => {
      let slug = workspaceSlug;
      let fetchChatroomData;

      if (chatroomSlug === 'unreads') {
        fetchChatroomData = fetchUnreads;
      } else if (chatroomSlug === 'threads') {
        fetchChatroomData = fetchUserThreads;
      } else {
        slug = chatroomSlug;
        fetchChatroomData = fetchMessages;
      }

      return dispatch(fetchChatroomData.request(slug));
    },
    createChatroomSubRequest: chatroomId => (
      dispatch(createChatroomSub.request({ chatroomSlug, chatroomId }))
    ),
    fetchHistoryRequest: lastId => dispatch(fetchMessages.request(chatroomSlug, lastId)),
    updateScrollLocation: (chSlug, scrollLoc) => (
      dispatch(updateScrollLocation(chSlug, scrollLoc))
    ),
    clearAllUnread: (chSlug, lastRead) => dispatch(clearAllUnread(chSlug, lastRead)),
    closeDrawer: () => dispatch(updateDrawer(null)),
    openModal: modalType => dispatch(updateModal(modalType, null)),
    createMessageRequest: message => dispatch(createMessage.request(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomSwitch);
