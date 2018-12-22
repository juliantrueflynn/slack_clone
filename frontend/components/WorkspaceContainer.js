import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import withEntityWrapper from './withEntityWrapper';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { getSubbedWorkspaces, getChannelsMap } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { workspaceSlug }) => {
  const channelsMap = getChannelsMap(state);
  const defaultChatPath = state.ui.defaultChannel;
  const pathname = state.ui.displayChatPath;
  const chatPath = defaultChatPath || pathname;
  const channel = channelsMap[chatPath] || channelsMap[defaultChatPath];

  return {
    workspace: state.entities.workspaces[workspaceSlug],
    workspaces: getSubbedWorkspaces(state),
    chatPath,
    channel,
    channelsMap,
    channels: Object.values(channelsMap),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withActionCable(
  withEntityWrapper('workspaceSlug')(connect(mapStateToProps, mapDispatchToProps)(Workspace))
);
