import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectSubbedWorkspaces, selectChannelsMap } from '../reducers/selectors';
import { modalOpen, modalClose } from '../actions/uiActions';
import { updateChannelSub } from '../actions/channelActions';
import withDetectMobileView from './withDetectMobileView';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  hasUnreadConvos: Object.values(state.entities.messages).some(convo => convo.hasUnreads),
  currentUser: state.session.currentUser,
  users: state.entities.members,
  workspaces: selectSubbedWorkspaces(state),
  workspace: state.entities.workspaces[workspaceSlug] || {},
  channelsMap: selectChannelsMap(state),
  channelSubsMap: state.entities.channelSubs,
  chatPath: state.ui.displayChannelSlug,
  drawer: state.ui.drawer,
  isModalOpen: state.ui.displayModal.modalType === 'MODAL_LEFT_SIDEBAR',
});

const mapDispatchToProps = dispatch => ({
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
  modalClose: () => dispatch(modalClose()),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(
  withDetectMobileView(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar))
);
