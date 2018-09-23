import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import {
  selectSubbedChats,
  selectUnsubbedChats,
  hasUreadChannels,
  hasUreadThreads,
  selectDmChats,
  selectSubbedWorkspaces,
} from '../reducers/selectors';
import { modalOpen } from '../actions/interactiveActions';
import { createChannel, updateChannelSub, fetchChannels } from '../actions/channelActions';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  hasUnreadChannels: hasUreadChannels(state),
  hasUnreadThreads: hasUreadThreads(state),
  currentUser: state.session.currentUser,
  workspaces: selectSubbedWorkspaces(state),
  currWorkspace: state.entities.workspaces[workspaceSlug],
  subbedChannels: selectSubbedChats(state).filter(ch => !ch.hasDm),
  unsubbedChannels: selectUnsubbedChats(state),
  dmChats: selectDmChats(state),
  members: state.entities.members,
});

const mapDispatchToProps = dispatch => ({
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
  createChannelRequest: channel => dispatch(createChannel.request(channel)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));
