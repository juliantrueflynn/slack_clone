import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectDmChats, selectSubbedWorkspaces, selectEntityBySlug } from '../reducers/selectors';
import { modalOpen } from '../actions/uiActions';
import { updateChannelSub, fetchChannels } from '../actions/channelActions';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  hasUnreadConvos: Object.values(state.entities.messages).some(convo => convo.hasUnreads),
  currentUser: state.session.currentUser,
  workspaces: selectSubbedWorkspaces(state),
  currWorkspace: selectEntityBySlug(state, 'workspaces', workspaceSlug),
  currChatSlug: state.ui.displayChannelSlug,
  channels: Object.values(state.entities.channels).filter(ch => !ch.hasDm),
  dmChats: selectDmChats(state),
  members: state.entities.members,
  drawer: state.ui.drawer,
});

const mapDispatchToProps = dispatch => ({
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));
