import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSubbedWorkspaces, getChannelsMap, getDMChannels } from '../reducers/selectors';
import { updateModal, updateDropdown } from '../actions/uiActions';
import { updateChannelSub } from '../actions/channelActions';
import withWindowResize from './withWindowResize';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = (state, { match: { url, params: { workspaceSlug } } }) => {
  const currUserSlug = state.session.currentUser.slug;
  const user = state.entities.members[currUserSlug];

  const channelsMap = getChannelsMap(state);
  const channels = Object.values(channelsMap);
  const chatPath = state.ui.displayChatPath;

  const chatPathUrl = channelsMap[chatPath] ? `${url}/messages/${chatPath}` : `${url}/${chatPath}`;
  const profileUrl = `${chatPathUrl}/team/${user.slug}`;

  const unreadsMap = state.entities.unreads;
  const unreads = Object.values(unreadsMap).filter(unread => unread && unread.hasUnreads);
  const hasUnreadChannels = unreads.some(unread => unread.readableType === 'Channel');
  const hasUnreadConvos = unreads.some(unread => unread.readableType === 'Message');

  const workspaces = getSubbedWorkspaces(state).map(({ slug, title: label }) => ({
    link: `/${slug}`,
    label,
    hasNoDrawer: true,
  }));

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
    user,
    workspaces,
    workspace: state.entities.workspaces[workspaceSlug],
    subbedChannels,
    dmChannels,
    chatPath,
    profileUrl,
    drawer: state.ui.drawer,
    isModalOpen: state.ui.displayModal.modalType === 'MODAL_LEFT_SIDEBAR',
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { workspaceSlug } } }) => ({
  openChannelsListModal: () => dispatch(updateModal('MODAL_CHATS', { workspaceSlug })),
  openChannelFormModal: workspaceId => dispatch(updateModal('MODAL_FORM_CHANNEL', { workspaceId })),
  closeModal: () => dispatch(updateModal(null)),
  openDropdown: (ddType, ddProps) => dispatch(updateDropdown(ddType, ddProps)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(
  withWindowResize(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar))
);
