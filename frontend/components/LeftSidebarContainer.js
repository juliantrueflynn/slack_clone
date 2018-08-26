import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import {
  selectWorkspaces,
  selectSubbedChats,
  selectDmChats,
  selectChatMembers,
  selectChatIdBySlug,
  selectWorkspaceIdBySlug,
  selectCurrentUserSlug,
  selectUnsubbedChats,
} from '../reducers/selectors';
import { modalOpen } from '../actions/interactiveActions';
import { createChannel, updateChannelSub, fetchChannels } from '../actions/channelActions';

const mapStateToProps = (state, { match: { params: { workspaceSlug, channelSlug } } }) => ({
  currentUser: state.session.currentUser,
  workspaces: selectWorkspaces(state),
  workspaceSlug,
  workspaceId: selectWorkspaceIdBySlug(state, workspaceSlug),
  channelSlug: state.ui.displayChannelSlug,
  channelId: selectChatIdBySlug(state, channelSlug),
  userSlug: selectCurrentUserSlug(state),
  subbedChannels: selectSubbedChats(state),
  unsubbedChannels: selectUnsubbedChats(state),
  dmChats: selectDmChats(state),
  members: selectChatMembers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  modalOpen: modalType => dispatch(modalOpen(modalType)),
  createChannelRequest: channel => dispatch(createChannel.request(channel)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));
