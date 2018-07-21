import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { camelizeKeys } from 'humps';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspaceActions';
import WorkspacePage from './WorkspacePage';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  channels: Object.values(state.entities.channels),
  workspaceSlug,
  membersSlugs: Object.keys(state.entities.members),
  subsHash: state.entities.members,
  isLoading: state.ui.isWorkspaceLoading,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  actionCableReceive: actionFromActionCable => dispatch(camelizeKeys(actionFromActionCable)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage));
