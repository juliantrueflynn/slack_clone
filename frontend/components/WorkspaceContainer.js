import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { modalClose, drawerClose } from '../actions/uiActions';
import { createReaction } from '../actions/reactionActions';
import { selectChannelsWithEntities } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  workspaceSlug,
  channels: selectChannelsWithEntities(state),
  workspaces: state.entities.workspaces,
  isLoading: state.ui.isWorkspaceLoading,
  modal: state.ui.displayModal,
  currentUser: state.session.currentUser,
  drawerType: state.ui.drawer.drawerType,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  modalClose: () => dispatch(modalClose()),
  drawerClose: () => dispatch(drawerClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Workspace));
