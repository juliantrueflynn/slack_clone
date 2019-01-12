import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSubbedWorkspaces, getChatroomsMap, getDMChannels } from '../reducers/selectors';
import { updateModal } from '../actions/uiActions';
import { updateChatroomSub } from '../actions/chatroomActions';
import withWindowResize from './withWindowResize';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = (state, { match: { url, params: { workspaceSlug } } }) => {
  const currUserSlug = state.session.currentUser.slug;
  const user = state.entities.members[currUserSlug];

  const chatroomsMap = getChatroomsMap(state);
  const chatrooms = Object.values(chatroomsMap);
  const chatPath = state.ui.displayChatPath;

  let profileUrl = `${url}/${chatPath}/team/${user.slug}`;
  if (chatroomsMap[chatPath]) {
    profileUrl = `${url}/messages/${chatPath}/team/${user.slug}`;
  }

  const unreadsMap = state.entities.unreads;
  const unreads = Object.values(unreadsMap).filter(unread => unread && unread.hasUnreads);
  const hasUnreadChannels = unreads.some(unread => unread.readableType === 'Channel');
  const hasUnreadConvos = unreads.some(unread => unread.readableType === 'Message');

  const subbedWorkspaces = getSubbedWorkspaces(state);
  const workspaces = subbedWorkspaces.map(({ slug, title: label }) => ({
    link: `/${slug}`,
    label,
    hasNoDrawer: true,
  }));

  const chatItemDecorate = ({ title: label, slug, status }) => ({
    slug,
    status,
    label,
    link: `${url}/messages/${slug}`,
    modifierClassName: unreadsMap[slug] && unreadsMap[slug].hasUnreads ? 'unread' : null,
    isActive: (match, { pathname }) => match && pathname.includes(`messages/${chatPath}`),
  });
  const dmChannels = getDMChannels(state).map(ch => chatItemDecorate(ch));
  const subbedChannels = chatrooms.filter(ch => ch.isSub && !ch.hasDm).sort((a, b) => (
    a.title.localeCompare(b.title)
  )).map(ch => chatItemDecorate(ch));

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
  openChannelFormModal: workspaceId => dispatch(updateModal('MODAL_FORM_CHATROOM', { workspaceId })),
  closeModal: () => dispatch(updateModal(null)),
  updateChatroomSubRequest: chatroomSub => dispatch(updateChatroomSub.request(chatroomSub)),
});

export default withRouter(
  withWindowResize(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar))
);
