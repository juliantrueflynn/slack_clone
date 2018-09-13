import { connect } from 'react-redux';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import WorkspacePage from './WorkspacePage';
import withActionCable from './withActionCable';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  defaultChat: Object.values(state.entities.channels)[0],
  workspaceSlug,
  isLoading: state.ui.isWorkspaceLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withActionCable(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage));
