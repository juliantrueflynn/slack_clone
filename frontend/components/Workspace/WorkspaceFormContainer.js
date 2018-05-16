import { connect } from 'react-redux';
import WorkspaceForm from './WorkspaceForm';
import { createWorkspaceRequest } from '../../actions/workspaceActions';

const mapDispatchToProps = dispatch => ({
  createWorkspaceRequest: workspace => dispatch(
    createWorkspaceRequest(workspace)
  )
});

export default connect(null, mapDispatchToProps)(WorkspaceForm);