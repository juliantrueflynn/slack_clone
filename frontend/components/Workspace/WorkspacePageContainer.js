import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { camelizeKeys } from 'humps';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspaceActions';
import { getChannels } from '../../reducers/selectors';
import WorkspacePage from './WorkspacePage';
import isFetching from '../../util/isFetchingUtil';

const mapStateToProps = (state, { match, location }) => {
  const doesUrlMatchLocation = match.url === location.pathname;
  const isChannelPath = match.path === '/:workspaceSlug/:channelSlug';

  return {
    channels: getChannels(state),
    workspaceSlug: match.params.workspaceSlug,
    isExactMatch: doesUrlMatchLocation && !match.params.channelSlug && isChannelPath,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  actionCableReceive: actionFromActionCable => dispatch(camelizeKeys(actionFromActionCable)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(isFetching('workspace')(WorkspacePage)));
