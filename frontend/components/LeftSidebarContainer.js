import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import {
  selectSubbedChats,
  selectUnsubbedChats,
  selectDmChats,
  selectSubbedWorkspaces,
} from '../reducers/selectors';
import { modalOpen } from '../actions/uiActions';
import { createChannel, updateChannelSub, fetchChannels } from '../actions/channelActions';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  hasUnreadConvos: Object.values(state.entities.messages).some(convo => convo.hasUnreads),
  currentUser: state.session.currentUser,
  workspaces: selectSubbedWorkspaces(state),
  currWorkspace: state.entities.workspaces[workspaceSlug],
  currChatSlug: state.ui.displayChannelSlug,
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
