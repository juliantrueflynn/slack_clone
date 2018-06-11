import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspaceActions';
import { getChannels } from '../../reducers/selectors';
import WorkspacePage from './WorkspacePage';

const mapStateToProps = state => ({
  channels: getChannels(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage));
