import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateModal,
  updateDrawer,
  accordionOpen,
  destroySearch,
  fetchSearch,
  updateDropdown,
} from '../actions/uiActions';
import { destroyChannelSub } from '../actions/channelActions';
import { getChannelsMap, getMessagesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => {
  const channelsMap = getChannelsMap(state);
  const channel = channelsMap[chatPath];
  const channels = Object.values(channelsMap);
  const channelUnreadsLen = channels.reduce((acc, curr) => {
    let total = acc;
    total += curr.unreadsLength;
    return total;
  }, 0);

  const messages = Object.values(getMessagesMap(state));
  const convoUnreadsLen = messages.filter(convo => convo.hasUnreads).length;
  const searchMessages = messages.filter(msg => msg.isInSearch).sort((a, b) => b.id - a.id);

  return {
    chatPath,
    channelsMap,
    channel,
    messages,
    searchMessages,
    convoUnreadsLen,
    channelUnreadsLen,
    users: state.entities.members,
    currentUser: state.session.currentUser,
    modalType: state.ui.displayModal.modalType,
    drawerType: state.ui.drawer.drawerType,
    searchQuery: state.ui.searchQuery,
    isLoading: state.isLoading.search,
    dropdownProps: state.ui.dropdown.dropdownProps,
    isDdOpen: state.ui.dropdown.dropdownType === 'DROPDOWN_CHANNEL_EDIT',
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, modalProps = null) => dispatch(updateModal(modalType, modalProps)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openDropdown: (ddType, ddProps) => dispatch(updateDropdown(ddType, ddProps)),
  closeDropdown: () => dispatch(updateDropdown(null)),
  accordionOpen: accordionType => dispatch(accordionOpen('details', accordionType)),
  fetchSearchRequest: (query, shouldNotSearch = false) => (
    dispatch(fetchSearch.request(query, shouldNotSearch))
  ),
  destroySearch: () => dispatch(destroySearch()),
  destroyChannelSubRequest: channelSlug => dispatch(destroyChannelSub.request(channelSlug)),
  closeModal: () => dispatch(updateModal(null)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
