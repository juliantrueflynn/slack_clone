import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { modalClose, drawerClose, modalOpen } from '../actions/uiActions';
import { createReaction } from '../actions/reactionActions';
import { selectChannelsWithEntitiesMap } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  workspaceSlug,
  channels: selectChannelsWithEntitiesMap(state),
  workspaces: state.entities.workspaces,
  isLoading: state.ui.isWorkspaceLoading,
  modal: state.ui.displayModal,
  currentUser: state.entities.members[state.session.currentUser.slug],
  drawerType: state.ui.drawer.drawerType,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  modalOpen: modalType => dispatch(modalOpen(modalType)),
  modalClose: () => dispatch(modalClose()),
  drawerClose: () => dispatch(drawerClose()),
});

export default withActionCable(connect(mapStateToProps, mapDispatchToProps)(Workspace));
