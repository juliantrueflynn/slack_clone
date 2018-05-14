import { connect } from 'react-redux';
import WorkspacesMenu from './WorkspacesMenu';
import { getWorkspaces } from '../../reducers/selectors';
import { workspacesRequest } from '../../actions/workspaceActions';
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
)(WorkspacesMenu));