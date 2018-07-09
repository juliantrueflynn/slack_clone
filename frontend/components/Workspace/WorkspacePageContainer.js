import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { camelizeKeys } from 'humps';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspaceActions';
import { getChannels } from '../../reducers/selectors';
import WorkspacePage from './WorkspacePage';
import isFetching from '../../util/isFetchingUtil';

const mapStateToProps = (state, { match }) => ({
  channels: getChannels(state),
  workspaceSlug: match.params.workspaceSlug,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  actionCableReceive: actionFromActionCable => dispatch(camelizeKeys(actionFromActionCable)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(isFetching('workspace')(WorkspacePage)));
