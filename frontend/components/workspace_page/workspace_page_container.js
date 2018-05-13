import { connect } from 'react-redux';
import WorkspacePage from './workspace_page';
import { workspaceRequest } from '../../actions/workspace_actions';
import { navigate } from '../../actions/navigate_actions';

const mapDispatchToProps = dispatch => ({
  workspaceRequest: workspaceSlug => dispatch(workspaceRequest(workspaceSlug)),
  navigate: path => dispatch(navigate(path)),
});

export default connect(
  null,
  mapDispatchToProps
)(WorkspacePage);