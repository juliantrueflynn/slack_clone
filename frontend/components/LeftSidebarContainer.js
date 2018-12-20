import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSubbedWorkspaces, getChannelsMap, getDMChannels } from '../reducers/selectors';
import { updateModal, updateDropdown } from '../actions/uiActions';
import { updateChannelSub } from '../actions/channelActions';
import withWindowResize from './withWindowResize';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = (state, { match: { url, params: { workspaceSlug } } }) => {
  const currUserSlug = state.session.currentUser.slug;
  const channelsMap = getChannelsMap(state);
  const channels = Object.values(channelsMap);
  const chatPath = state.ui.displayChatPath;

  const unreadsMap = state.entities.unreads;
  const unreads = Object.values(unreadsMap).filter(unread => unread && unread.hasUnreads);
  const hasUnreadChannels = unreads.some(unread => unread.readableType === 'Channel');
  const hasUnreadConvos = unreads.some(unread => unread.readableType === 'Message');

  const channelItemDecorate = ({ title: label, slug, status }) => ({
    slug,
    status,
    label,
    link: `${url}/messages/${slug}`,
    modifierClassName: unreadsMap[slug] && unreadsMap[slug].hasUnreads ? 'unread' : null,
    isActive: (match, { pathname }) => match && pathname.includes(`messages/${chatPath}`),
  });
  const dmChannels = getDMChannels(state).map(ch => channelItemDecorate(ch));
  const subbedChannels = channels.filter(ch => ch.isSub && !ch.hasDm).sort((a, b) => (
    a.title.localeCompare(b.title)
  )).map(ch => channelItemDecorate(ch));

  return {
    hasUnreadConvos,
    hasUnreadChannels,
    user: state.entities.members[currUserSlug],
    workspaces: getSubbedWorkspaces(state),
    workspace: state.entities.workspaces[workspaceSlug],
    subbedChannels,
    dmChannels,
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
