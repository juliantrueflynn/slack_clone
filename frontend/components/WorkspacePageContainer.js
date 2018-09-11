import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

export default withActionCable(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage))
);
