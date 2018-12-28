import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateModal,
  updateDrawer,
  accordionOpen,
  destroySearch,
  updateDropdown,
} from '../actions/uiActions';
import { destroyChannelSub } from '../actions/channelActions';
import { getChannelsMap, getMessagesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => {
  const channelsMap = getChannelsMap(state);
  const channel = channelsMap[chatPath];
  const { unreadsByChannel } = state;
  const channelUnreadsLen = Object.values(unreadsByChannel).reduce((acc, curr) => {
    let total = acc;
    total += curr.length;
    return total;
  }, 0);

  const msgsMap = getMessagesMap(state);
  const messages = Object.values(msgsMap);
  const unreadsMap = state.entities.unreads;
  const unreads = Object.values(unreadsMap).filter(unread => unread && unread.hasUnreads);
  const convoUnreadsLen = unreads.filter(unread => unread && unread.readableType === 'Message').length;

  return {
    chatPath,
    channelsMap,
    channel,
    messages,
    convoUnreadsLen,
    channelUnreadsLen,
    users: state.entities.members,
    currentUserSlug: state.session.currentUser.slug,
    modalType: state.ui.displayModal.modalType,
    drawerType: state.ui.drawer.drawerType,
    searchQuery: state.search.searchQuery,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { chatPath } } }) => ({
  openModal: (modalType, modalProps) => dispatch(updateModal(modalType, modalProps)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openDropdown: (ddType, ddProps) => dispatch(updateDropdown(ddType, ddProps)),
  closeDropdown: () => dispatch(updateDropdown(null)),
  accordionOpen: accordionType => dispatch(accordionOpen('details', accordionType)),
  destroySearch: () => dispatch(destroySearch()),
  destroyChannelSubRequest: () => dispatch(destroyChannelSub.request(chatPath)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
