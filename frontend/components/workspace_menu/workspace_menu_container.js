import { connect } from 'react-redux';
import WorkspaceMenu from './workspace_menu';
import { getWorkspaces } from '../../reducers/selectors';
import { workspacesRequest } from '../../actions/workspace_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser),
  workspaces: getWorkspaces(state),
});

const mapDispatchToProps = dispatch => ({
  workspacesRequest: () => dispatch(workspacesRequest()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceMenu));