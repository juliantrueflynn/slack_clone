import { connect } from 'react-redux';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { getSubbedWorkspaces, getChatroomsMap } from '../reducers/selectors';
import withActionCable from './withActionCable';
import Workspace from './Workspace';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => {
  const chatroomsMap = getChatroomsMap(state);
  const chatrooms = Object.values(getChatroomsMap(state));

  const defaultChatPath = state.ui.defaultChannel;
  const currentChatPath = state.ui.displayChatPath;
  const chatPath = currentChatPath || defaultChatPath;
  const chatroom = chatroomsMap[chatPath] || chatroomsMap[defaultChatPath];

  const actionCablesChannels = chatrooms.filter(ch => (
    ch.isSub || ch.slug === chatPath
  )).map(ch => (
    { channel: 'ChatroomChannel', chatroomSlug: ch.slug }
  ));

  return {
    isLoading: state.isLoading.workspace,
    workspace: state.entities.workspaces[workspaceSlug],
    workspaces: getSubbedWorkspaces(state),
    workspaceSlug,
    chatPath,
    chatroom,
    actionCablesChannels,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { workspaceSlug } } }) => ({
  fetchWorkspaceRequest: () => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withActionCable(connect(mapStateToProps, mapDispatchToProps)(Workspace));
