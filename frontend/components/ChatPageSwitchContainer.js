import { connect } from 'react-redux';
import {
  getChannelsMap,
  getChatViewChannels,
  getMessagesMap,
  getAllThreadViewMessages,
  getChannelViewMessages,
} from '../reducers/selectors';
import {
  fetchMessages,
  fetchHistory,
  createMessage,
  fetchUserThreads,
} from '../actions/messageActions';
import {
  updateDrawer,
  updateModal,
  updateScrollLocation,
  updateChatPath,
} from '../actions/uiActions';
import { createChannelSub } from '../actions/channelActions';
import { clearUnreads, fetchUnreads } from '../actions/readActions';
import ChatPageSwitch from './ChatPageSwitch';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => {
  const channel = getChannelsMap(state)[chatPath];
  let messages = [];

  if (chatPath === 'unreads') {
    messages = getMessagesMap(state);
  } else if (chatPath === 'threads') {
    messages = getAllThreadViewMessages(state);
  } else {
    messages = getChannelViewMessages(state);
  }

  return {
    users: state.entities.members,
    currentUser: state.session.currentUser,
    isLoading: state.isLoading,
    drawerType: state.ui.drawer.drawerType,
    drawerSlug: state.ui.drawer.drawerSlug,
    chatPath,
    channel,
    messages,
    unreadsMap: state.entities.unreads,
    channels: getChatViewChannels(state),
  };
};

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  updateChatPath: chatPath => dispatch(updateChatPath(chatPath)),
  fetchChatPageData: () => {
    let slug = params.workspaceSlug;
    let fetchChatPage;

    if (params.chatPath === 'unreads') {
      fetchChatPage = fetchUnreads;
    } else if (params.chatPath === 'threads') {
      fetchChatPage = fetchUserThreads;
    } else {
      slug = params.chatPath;
      fetchChatPage = fetchMessages;
    }

    return dispatch(fetchChatPage.request(slug));
  },
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  fetchHistoryRequest: startDate => (
    dispatch(fetchHistory.request(params.chatPath, startDate))
  ),
  updateScrollLocation: (channelSlug, scrollLoc) => (
    dispatch(updateScrollLocation(channelSlug, scrollLoc))
  ),
  clearUnreads: (channelSlug, lastRead) => dispatch(clearUnreads(channelSlug, lastRead)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openModal: modalType => dispatch(updateModal(modalType, null)),
  createMessageRequest: message => dispatch(createMessage.request(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPageSwitch);
