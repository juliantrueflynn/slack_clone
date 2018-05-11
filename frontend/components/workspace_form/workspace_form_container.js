import { connect } from 'react-redux';
import WorkspaceForm from './workspace_form';
import { createWorkspace } from '../../actions/workspace_actions';

const mapDispatchToProps = dispatch => ({
  createWorkspace: workspace => dispatch(createWorkspace(workspace))
});

export default connect(
  null,
  mapDispatchToProps
)(WorkspaceForm);