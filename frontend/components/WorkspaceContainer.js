import { connect } from 'react-redux';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { getSubbedWorkspaces, getChannelsMap } from '../reducers/selectors';
import withActionCable from './withActionCable';
import Workspace from './Workspace';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => {
  const channelsMap = getChannelsMap(state);
  const channels = Object.values(getChannelsMap(state));

  const defaultChatPath = state.ui.defaultChannel;
  const currentChatPath = state.ui.displayChatPath;
  const chatPath = currentChatPath || defaultChatPath;
  const channel = channelsMap[chatPath] || channelsMap[defaultChatPath];

  const actionCablesChannels = channels.filter(ch => (
    ch.isSub || ch.slug === chatPath
  )).map(ch => (
    { channel: 'ChatChannel', channelSlug: ch.slug }
  ));

  return {
    isLoading: state.isLoading.workspace,
    workspace: state.entities.workspaces[workspaceSlug],
    workspaces: getSubbedWorkspaces(state),
    workspaceSlug,
    chatPath,
    channel,
    actionCablesChannels,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { workspaceSlug } } }) => ({
  fetchWorkspaceRequest: () => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withActionCable(connect(mapStateToProps, mapDispatchToProps)(Workspace));
