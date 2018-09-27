import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { modalClose } from '../actions/uiActions';
import { createReaction } from '../actions/reactionActions';
import Workspace from './Workspace';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  workspaceSlug,
  channels: state.entities.channels,
  workspaces: state.entities.workspaces,
  isLoading: state.ui.isWorkspaceLoading,
  modal: state.ui.displayModal,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  modalClose: () => dispatch(modalClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Workspace));
