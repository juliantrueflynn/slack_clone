import { connect } from 'react-redux';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import WorkspacePage from './WorkspacePage';
import withActionCable from './withActionCable';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  workspaceSlug,
  channels: state.entities.channels,
  workspaces: state.entities.workspaces,
  isLoading: state.ui.isWorkspaceLoading,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withActionCable(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage));
