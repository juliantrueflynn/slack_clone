import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateModal,
  updateDrawer,
  accordionOpen,
  updateDropdown,
} from '../actions/uiActions';
import { destroyChatroomSub, createChatroomSub } from '../actions/chatroomActions';
import { getChatroomsMap, getMessagesMap } from '../reducers/selectors';
import ChannelHeader from '../components/ChannelHeader';

const getChatTitle = (chatroomSlug, chatroom) => {
  if (chatroomSlug === 'unreads') {
    return 'All Unreads';
  }

  if (chatroomSlug === 'threads') {
    return 'All Threads';
  }

  return chatroom && chatroom.title;
};

const mapStateToProps = (state, { match: { params: { chatroomSlug } } }) => {
  const { members: usersMap, unreads: unreadsMap } = state.entities;

  const chatroomsMap = getChatroomsMap(state);
  const chatroom = chatroomsMap[chatroomSlug];
  const { defaultChatroomSlug } = state.ui;
  const isNotDefaultChannel = chatroomSlug !== defaultChatroomSlug;
  const dmChannelUser = chatroom && chatroom.hasDm ? usersMap[chatroom.dmUserSlug] : {};

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
    chatroomSlug,
    chatroomsMap,
    chatroom,
    chatTitle: getChatTitle(chatroomSlug, chatroom),
    dmChannelUser,
    isNotDefaultChannel,
    messages,
    convoUnreadsLen,
    channelUnreadsLen,
    usersMap,
    currentUserSlug: state.session.currentUser.slug,
    modalType: state.ui.displayModal.modalType,
    drawerType: state.ui.drawer.drawerType,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { chatroomSlug } } }) => ({
  openModal: (modalType, modalProps) => dispatch(updateModal(modalType, modalProps)),
  openProfileModal: () => dispatch(updateModal('MODAL_PROFILE')),
  openLeftSidebarModal: () => dispatch(updateModal('MODAL_LEFT_SIDEBAR', null)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  closeDropdown: () => dispatch(updateDropdown(null)),
  accordionOpen: accordionType => dispatch(accordionOpen('details', accordionType)),
  createChatroomSubRequest: chatroomId => (
    dispatch(createChatroomSub.request({ chatroomId, chatroomSlug }))
  ),
  destroyChatroomSubRequest: () => dispatch(destroyChatroomSub.request(chatroomSlug)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
