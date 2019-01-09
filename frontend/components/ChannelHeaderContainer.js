import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateModal,
  updateDrawer,
  accordionOpen,
  updateSearchQuery,
  updateDropdown,
} from '../actions/uiActions';
import { destroyChannelSub, createChannelSub } from '../actions/channelActions';
import { getChannelsMap, getMessagesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const getChatTitle = (chatPath, channel) => {
  if (chatPath === 'unreads') {
    return 'All Unreads';
  }

  if (chatPath === 'threads') {
    return 'All Threads';
  }

  return channel && channel.title;
};

const mapStateToProps = (state, { match: { params: { chatPath } } }) => {
  const { members: users, unreads: unreadsMap } = state.entities;

  const channelsMap = getChannelsMap(state);
  const channel = channelsMap[chatPath];
  const defaultChatPath = state.ui.defaultChannel;
  const isNotDefaultChannel = chatPath !== defaultChatPath;
  const dmChannelUser = channel && channel.hasDm ? users[channel.dmUserSlug] : {};

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
    channelsMap,
    channel,
    chatTitle: getChatTitle(chatPath, channel),
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
  openLeftSidebarModal: () => dispatch(updateModal('MODAL_LEFT_SIDEBAR', null)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  closeDropdown: () => dispatch(updateDropdown(null)),
  accordionOpen: accordionType => dispatch(accordionOpen('details', accordionType)),
  destroySearchQuery: () => dispatch(updateSearchQuery()),
  createChannelSubRequest: channelId => (
    dispatch(createChannelSub.request({ channelId, channelSlug: chatPath }))
  ),
  destroyChannelSubRequest: () => dispatch(destroyChannelSub.request(chatPath)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
