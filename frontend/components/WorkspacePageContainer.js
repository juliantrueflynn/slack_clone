import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { selectChannels, isRightSidebarOpen } from '../reducers/selectors';
import WorkspacePage from './WorkspacePage';
import withActionCable from './withActionCable';
import { rightSidebarClose } from '../actions/rightSidebarActions';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  channels: selectChannels(state, workspaceSlug),
  workspaceSlug,
  isLoading: state.ui.isWorkspaceLoading,
  currentUser: state.session.currentUser,
  isRightSidebarOpen: isRightSidebarOpen(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  rightSidebarClose: () => dispatch(rightSidebarClose()),
});

export default withActionCable(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage))
);
