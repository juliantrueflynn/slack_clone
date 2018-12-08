import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectSubbedWorkspaces, getChannelsMap } from '../reducers/selectors';
import { updateModal, updateDropdown } from '../actions/uiActions';
import { updateChannelSub } from '../actions/channelActions';
import withWindowResize from './withWindowResize';
import LeftSidebar from './LeftSidebar';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  hasUnreadConvos: Object.values(state.entities.messages).some(convo => convo.hasUnreads),
  currentUser: state.session.currentUser,
  users: state.entities.members,
  workspaces: selectSubbedWorkspaces(state),
  workspace: state.entities.workspaces[workspaceSlug] || {},
  channelsMap: getChannelsMap(state),
  channelSubsMap: state.entities.channelSubs,
  chatPath: state.ui.displayChannelSlug,
  drawer: state.ui.drawer,
  isModalOpen: state.ui.displayModal.modalType === 'MODAL_LEFT_SIDEBAR',
  isDdOpen: state.ui.dropdown.dropdownType === 'DROPDOWN_PROFILE',
  dropdownProps: state.ui.dropdown.dropdownProps,
});

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, modalProps = {}) => dispatch(updateModal(modalType, modalProps)),
  closeModal: () => dispatch(updateModal(null)),
  openDropdown: (ddType, ddProps) => dispatch(updateDropdown(ddType, ddProps)),
  closeDropdown: () => dispatch(updateDropdown(null)),
  updateChannelSubRequest: channelSub => dispatch(updateChannelSub.request(channelSub)),
});

export default withRouter(
  withWindowResize(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar))
);
