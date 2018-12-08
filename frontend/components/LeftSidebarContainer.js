import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectSubbedWorkspaces, getChannelsMap, getDMChannels } from '../reducers/selectors';
import { updateModal, updateDropdown } from '../actions/uiActions';
import { updateChannelSub } from '../actions/channelActions';
import withWindowResize from './withWindowResize';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = (state, { match: { url, params: { workspaceSlug } } }) => {
  const currUserSlug = state.session.currentUser.slug;
  const channelsMap = getChannelsMap(state);
  const channels = Object.values(channelsMap);
  const hasUnreadChannels = channels.some(ch => ch.hasUnreads);
  const hasUnreadConvos = Object.values(state.entities.messages).some(convo => convo.hasUnreads);
  const subbedChannels = channels.filter(ch => ch.isSub && !ch.hasDm).sort((a, b) => (
    a.title.localeCompare(b.title)
  ));
  const chatPath = state.ui.displayChannelSlug;
  const chatPathUrl = channelsMap[chatPath] ? `${url}/messages/${chatPath}` : `${url}/${chatPath}`;

  return {
    hasUnreadConvos,
    hasUnreadChannels,
    user: state.entities.members[currUserSlug],
    workspaces: selectSubbedWorkspaces(state),
    workspace: state.entities.workspaces[workspaceSlug],
    subbedChannels,
    dmChannels: getDMChannels(state),
    chatPathUrl,
    chatPath,
    drawer: state.ui.drawer,
    isModalOpen: state.ui.displayModal.modalType === 'MODAL_LEFT_SIDEBAR',
    isDdOpen: state.ui.dropdown.dropdownType === 'DROPDOWN_PROFILE',
    dropdownProps: state.ui.dropdown.dropdownProps,
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, modalProps = {}) => dispatch(updateModal(modalType, modalProps)),
  closeModal: () => dispatch(updateModal(null)),
  openDropdown: (ddType, ddProps) => dispatch(updateDropdown(ddType, ddProps)),
  closeDropdown: () => dispatch(updateDropdown(null)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(
  withWindowResize(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar))
);
