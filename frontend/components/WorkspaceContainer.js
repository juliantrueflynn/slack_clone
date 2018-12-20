import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import withEntityWrapper from './withEntityWrapper';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { updateModal } from '../actions/uiActions';
import { fetchChannels } from '../actions/channelActions';
import { getSubbedWorkspaces, getChannelsMap } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { workspaceSlug }) => {
  const channelsMap = getChannelsMap(state);
  const chatPath = state.ui.displayChatPath;

  return {
    workspace: state.entities.workspaces[workspaceSlug],
    workspaces: getSubbedWorkspaces(state),
    chatPath,
    channel: channelsMap[chatPath],
    channelsMap,
    channels: Object.values(channelsMap),
    modalType: state.ui.displayModal.modalType,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  closeModal: () => dispatch(updateModal(null)),
});

export default withActionCable(
  withEntityWrapper('workspaceSlug')(connect(mapStateToProps, mapDispatchToProps)(Workspace))
);
