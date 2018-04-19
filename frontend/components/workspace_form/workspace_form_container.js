import { connect } from 'react-redux';
import WorkspaceForm from './workspace_form';
import { createWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = state => ({
  currentUserId: state.session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  createWorkspace: workspace => dispatch(createWorkspace(workspace))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceForm);