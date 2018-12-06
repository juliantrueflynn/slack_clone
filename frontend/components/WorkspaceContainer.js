import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import withEntityWrapper from './withEntityWrapper';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { updateModal } from '../actions/uiActions';
import { fetchChannels } from '../actions/channelActions';
import { selectSubbedWorkspaces } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { workspaceSlug }) => ({
  workspace: state.entities.workspaces[workspaceSlug],
  chatPath: state.ui.displayChannelSlug,
  workspaces: selectSubbedWorkspaces(state),
  modalType: state.ui.displayModal.modalType,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  closeModal: () => dispatch(updateModal(null)),
});

export default withActionCable(
  withEntityWrapper('workspaceSlug')(connect(mapStateToProps, mapDispatchToProps)(Workspace))
);
