import { connect } from 'react-redux';
import WorkspaceForm from './WorkspaceForm';
import { createWorkspace } from '../../actions/workspaceActions';

const mapDispatchToProps = dispatch => ({
  createWorkspaceRequest: workspace => dispatch(createWorkspace.request(workspace)),
});

export default connect(null, mapDispatchToProps)(WorkspaceForm);
