import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { getSubbedWorkspaces, getChatroomsMap } from '../reducers/selectors';
import Workspace from '../components/Workspace';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => {
  const chatroomsMap = getChatroomsMap(state);
  const defaultChatPath = state.ui.defaultChannel;
  const currentChatPath = state.ui.displayChatPath;
  const chatPath = currentChatPath || defaultChatPath;
  const chatroom = chatroomsMap[chatPath] || chatroomsMap[defaultChatPath];

  return {
    isLoading: state.isLoading.workspace,
    workspace: state.entities.workspaces[workspaceSlug],
    workspaces: getSubbedWorkspaces(state),
    workspaceSlug,
    chatPath,
    chatroom,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { workspaceSlug } } }) => ({
  fetchWorkspaceRequest: () => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Workspace));
