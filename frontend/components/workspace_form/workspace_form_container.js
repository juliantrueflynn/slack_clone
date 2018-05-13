import { connect } from 'react-redux';
import WorkspaceForm from './workspace_form';
import { createWorkspaceRequest } from '../../actions/workspace_actions';

const mapDispatchToProps = dispatch => ({
  createWorkspaceRequest: workspace => dispatch(
    createWorkspaceRequest(workspace)
  )
});

export default connect(
  null,
  mapDispatchToProps
)(WorkspaceForm);