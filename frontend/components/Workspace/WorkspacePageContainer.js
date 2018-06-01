import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WorkspacePage from './WorkspacePage';
import { workspaceRequest } from '../../actions/workspaceActions';
import { createWorkspaceSubReceive } from '../../actions/workspaceSubActions';

const mapDispatchToProps = dispatch => ({
  workspaceRequest: workspaceSlug => dispatch(workspaceRequest(workspaceSlug)),
  createWorkspaceSubReceive: workspaceSub => dispatch(
    createWorkspaceSubReceive(workspaceSub)
  )
});

export default withRouter(
  connect(null, mapDispatchToProps)(WorkspacePage)
);