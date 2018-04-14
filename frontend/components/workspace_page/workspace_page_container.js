import { connect } from 'react-redux';
import WorkspacePage from './workspace_page';
import { loadWorkspacePage } from '../../actions/workspace_actions';

const mapStateToProps = (state, ownProps) => ({
  workspaceSlug: ownProps.match.workspaceSlug,
  workspaces: state.entities.workspaces
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadWorkspacePage: workspaceId => dispatch(loadWorkspacePage(workspaceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspacePage);