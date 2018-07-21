import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import { selectSubbedChats, selectDmChats, selectChatMembers, selectWorkspaceIdBySlug } from '../reducers/selectors';
import { modalOpen, modalClose } from '../actions/interactiveActions';
import { createChannel } from '../actions/channelActions';

const mapStateToProps = (state, { match: { params } }) => ({
  currentUser: state.session.currentUser,
  workspaces: Object.values(state.entities.workspaces),
  workspaceSlug: params.workspaceSlug,
  workspaceId: selectWorkspaceIdBySlug(state, params.workspaceSlug),
  channelSlug: state.ui.displayChannelSlug,
  userSlug: state.session.currentUser && state.session.currentUser.slug,
  isSettingsModalOpen: state.ui.displayModal === 'SETTINGS',
  isChannelModalOpen: state.ui.displayModal === 'NEW_CHANNEL_MODAL',
  subbedChannels: selectSubbedChats(state),
  dmChats: selectDmChats(state),
  members: selectChatMembers(state),
});

const mapDispatchToProps = dispatch => ({
  modalOpen: modalType => dispatch(modalOpen(modalType)),
  modalClose: modalType => dispatch(modalClose(modalType)),
  createChannelRequest: channel => dispatch(createChannel.request(channel)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));
