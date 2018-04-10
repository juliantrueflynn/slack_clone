import { connect } from 'react-redux';
import WorkspacePage from './workspace_page';
import { fetchWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = (dispatch, ownProps) => ({
  workspaceSlug: ownProps.match.workspaceSlug,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchWorkspace: workspaceId => dispatch(fetchWorkspace(workspaceId)),
});

export default connect(
  null,
  mapDispatchToProps
)(WorkspacePage);