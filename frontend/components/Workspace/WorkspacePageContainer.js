import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { camelizeKeys } from 'humps';
import { fetchWorkspace, fetchWorkspaces } from '../../actions/workspaceActions';
import { getChannels } from '../../reducers/selectors';
import WorkspacePage from './WorkspacePage';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  channels: getChannels(state),
  workspaceSlug,
  defaultChannelSlug: state.entities.channels[0] && state.entities.channels[0].slug,
  isLoading: state.ui.isWorkspaceLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  actionCableReceive: actionFromActionCable => dispatch(camelizeKeys(actionFromActionCable)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkspacePage));
