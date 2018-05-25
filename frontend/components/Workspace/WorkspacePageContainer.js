import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WorkspacePage from './WorkspacePage';
import { workspaceRequest } from '../../actions/workspaceActions';

const mapDispatchToProps = dispatch => ({
  workspaceRequest: workspaceSlug => dispatch(workspaceRequest(workspaceSlug))
});

export default withRouter(
  connect(null, mapDispatchToProps)(WorkspacePage)
);