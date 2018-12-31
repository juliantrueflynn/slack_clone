import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import withEntityWrapper from './withEntityWrapper';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { getSubbedWorkspaces, getChannelsMap } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { workspaceSlug }) => {
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
    workspace: state.entities.workspaces[workspaceSlug],
    workspaces: getSubbedWorkspaces(state),
    chatPath,
    channel,
    actionCablesChannels,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withActionCable(
  withEntityWrapper('workspaceSlug')(connect(mapStateToProps, mapDispatchToProps)(Workspace))
);
