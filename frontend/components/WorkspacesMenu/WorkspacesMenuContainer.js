import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WorkspacesMenu from './WorkspacesMenu';
import { getWorkspaces } from '../../reducers/selectors';
import { fetchWorkspaces } from '../../actions/actionCreators';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser),
  workspaces: getWorkspaces(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaces: () => dispatch(fetchWorkspaces.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacesMenu));
