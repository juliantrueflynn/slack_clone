import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateModal,
  updateDrawer,
  accordionOpen,
  updateSearchQuery,
  updateDropdown,
} from '../actions/uiActions';
import { destroyChatroomSub, createChatroomSub } from '../actions/chatroomActions';
import { getChatroomsMap, getMessagesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const getChatTitle = (chatPath, chatroom) => {
  if (chatPath === 'unreads') {
    return 'All Unreads';
  }

  if (chatPath === 'threads') {
    return 'All Threads';
  }

  return chatroom && chatroom.title;
};

const mapStateToProps = (state, { match: { params: { chatPath } } }) => {
  const { members: users, unreads: unreadsMap } = state.entities;

  const chatroomsMap = getChatroomsMap(state);
  const chatroom = chatroomsMap[chatPath];
  const defaultChatPath = state.ui.defaultChannel;
  const isNotDefaultChannel = chatPath !== defaultChatPath;
  const dmChannelUser = chatroom && chatroom.hasDm ? users[chatroom.dmUserSlug] : {};

  const { unreadsByChannel } = state;
  const channelUnreadsLen = Object.values(unreadsByChannel).reduce((acc, curr) => {
    let total = acc;
    total += curr.length;

    return total;
  }, 0);

  const msgsMap = getMessagesMap(state);
  const messages = Object.values(msgsMap);
  const unreads = Object.values(unreadsMap).filter(unread => unread && unread.hasUnreads);
  const convoUnreadsLen = unreads.filter(unread => unread && unread.readableType === 'Message').length;

  return {
    chatPath,
    chatroomsMap,
    chatroom,
    chatTitle: getChatTitle(chatPath, chatroom),
    dmChannelUser,
    isNotDefaultChannel,
    messages,
    convoUnreadsLen,
    channelUnreadsLen,
    users,
    currentUserSlug: state.session.currentUser.slug,
    modalType: state.ui.displayModal.modalType,
    drawerType: state.ui.drawer.drawerType,
    searchQuery: state.search.searchQuery,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { chatPath } } }) => ({
  openModal: (modalType, modalProps) => dispatch(updateModal(modalType, modalProps)),
  openProfileModal: () => dispatch(updateModal('MODAL_PROFILE')),
  openSearchModal: () => dispatch(updateModal('MODAL_SEARCH')),
  openLeftSidebarModal: () => dispatch(updateModal('MODAL_LEFT_SIDEBAR', null)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  closeDropdown: () => dispatch(updateDropdown(null)),
  accordionOpen: accordionType => dispatch(accordionOpen('details', accordionType)),
  destroySearchQuery: () => dispatch(updateSearchQuery()),
  createChatroomSubRequest: chatroomId => (
    dispatch(createChatroomSub.request({ chatroomId, chatroomSlug: chatPath }))
  ),
  destroyChatroomSubRequest: () => dispatch(destroyChatroomSub.request(chatPath)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
