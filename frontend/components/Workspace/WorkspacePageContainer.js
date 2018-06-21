import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspaceActions';
import { getChannels } from '../../reducers/selectors';
import WorkspacePage from './WorkspacePage';
import isFetching from '../../util/isFetchingUtil';

const mapStateToProps = (state, { match, location }) => ({
  channels: getChannels(state),
  workspaceSlug: match.params.workspaceSlug,
  isExactMatch: match.url === location.pathname && !match.params.channelSlug,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(isFetching('workspace')(WorkspacePage)));
