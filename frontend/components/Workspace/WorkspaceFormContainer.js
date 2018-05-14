import { connect } from 'react-redux';
import WorkspaceForm from './WorkspaceForm';
import { createWorkspaceRequest } from '../../actions/workspaceActions';

const mapStateToProps = state => ({
  errors: state.errors.workspace,
});

const mapDispatchToProps = dispatch => ({
  createWorkspaceRequest: workspace => dispatch(
    createWorkspaceRequest(workspace)
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceForm);