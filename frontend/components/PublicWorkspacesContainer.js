import { connect } from 'react-redux';
import PublicWorkspaces from './PublicWorkspaces';
import { createWorkspaceSub, deleteWorkspaceSub } from '../actions/workspaceActions';

const mapDispatchToProps = dispatch => ({
  createWorkspaceSubRequest: workspaceSub => dispatch(createWorkspaceSub.request(workspaceSub)),
  deleteWorkspaceSubRequest: workspaceId => dispatch(deleteWorkspaceSub.request(workspaceId)),
});

export default connect(null, mapDispatchToProps)(PublicWorkspaces);
