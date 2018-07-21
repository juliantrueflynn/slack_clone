import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WorkspacesMenu from './WorkspacesMenu';
import { fetchWorkspaces } from '../../actions/workspaceActions';

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser,
  workspaces: Object.values(state.entities.workspaces),
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacesMenu));
