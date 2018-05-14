import { connect } from 'react-redux';
import WorkspacePage from './WorkspacePage';
import { workspaceRequest } from '../../actions/workspaceActions';
import { navigate } from '../../actions/navigateActions';

const mapDispatchToProps = dispatch => ({
  workspaceRequest: workspaceSlug => dispatch(workspaceRequest(workspaceSlug)),
  navigate: path => dispatch(navigate(path)),
});

export default connect(
  null,
  mapDispatchToProps
)(WorkspacePage);