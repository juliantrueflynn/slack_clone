import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspaceActions';
import { selectChannels } from '../../reducers/selectors';
import WorkspacePage from './WorkspacePage';
import withActionCable from '../withActionCable';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  channels: selectChannels(state, workspaceSlug),
  workspaceSlug,
  isLoading: state.ui.isWorkspaceLoading,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withActionCable(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage))
);
