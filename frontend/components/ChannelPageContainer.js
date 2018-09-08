import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { fetchChannel, createChannelSub } from '../actions/channelActions';
import { updateRead } from '../actions/readActions';
import {
  selectParentMessages,
  selectHashDmUsersBySlug,
  selectDmUsernamesBySlug,
  isUserChatSub,
  selectCurrentUserId,
  isModalOpen,
  selectWorkspaceIdBySlug,
  isRightSidebarOpen,
} from '../reducers/selectors';

const mapStateToProps = (state, { match: { params } }) => ({
  messages: selectParentMessages(state),
  channels: Object.values(state.entities.channels),
  channelSlug: params.channelSlug,
  messageSlug: state.ui.displayMessageSlug,
  rightSidebar: state.ui.rightSidebar,
  isRightSidebarOpen: isRightSidebarOpen(state),
  userSlug: state.ui.displayUserSlug,
  workspaceId: selectWorkspaceIdBySlug(state, params.workspaceSlug),
  isWorkspaceLoaded: !!state.entities.workspaces[params.workspaceSlug],
  channel: state.entities.channels[params.channelSlug],
  authors: selectHashDmUsersBySlug(state, params.channelSlug),
  currentUser: state.session.currentUser,
  dmUsernames: selectDmUsernamesBySlug(state, params.channelSlug, false),
  isChatSub: isUserChatSub(state),
  currentUserId: selectCurrentUserId(state),
  isReactionModalOpen: isModalOpen(state, 'MODAL_REACTION'),
});

const mapDispatchToProps = dispatch => ({
  fetchChannelRequest: channelSlug => dispatch(fetchChannel.request(channelSlug)),
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  updateReadRequest: read => dispatch(updateRead.request(read)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
