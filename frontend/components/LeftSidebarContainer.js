import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import {
  selectWorkspaces,
  selectSubbedChats,
  selectUnsubbedChats,
  hasUreadChannels,
  hasUreadThreads,
  selectDmChats,
} from '../reducers/selectors';
import { modalOpen } from '../actions/interactiveActions';
import { createChannel, updateChannelSub, fetchChannels } from '../actions/channelActions';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  hasUnreadChannels: hasUreadChannels(state),
  hasUnreadThreads: hasUreadThreads(state),
  currentUser: state.session.currentUser,
  workspaces: selectWorkspaces(state),
  currWorkspace: state.entities.workspaces[workspaceSlug],
  subbedChannels: selectSubbedChats(state).filter(ch => !ch.hasDm),
  unsubbedChannels: selectUnsubbedChats(state),
  dmChats: selectDmChats(state),
  members: state.entities.members,
});

const mapDispatchToProps = dispatch => ({
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  modalOpen: modal => dispatch(modalOpen(modal)),
  createChannelRequest: channel => dispatch(createChannel.request(channel)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));
