import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import withEntityWrapper from './withEntityWrapper';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { modalClose } from '../actions/uiActions';
import { createReaction } from '../actions/reactionActions';
import { fetchChannels } from '../actions/channelActions';
import { selectChannelsWithEntitiesMap, selectSubbedWorkspaces } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = state => ({
  channels: selectChannelsWithEntitiesMap(state),
  currChatSlug: state.ui.displayChannelSlug,
  workspaces: selectSubbedWorkspaces(state),
  isLoading: state.isLoading.workspace,
  modalType: state.ui.displayModal.modalType,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  modalClose: () => dispatch(modalClose()),
});

const entityProps = { entityName: 'workspaces', pathName: 'workspaceSlug' };

export default withActionCable(
  withEntityWrapper(entityProps)(connect(mapStateToProps, mapDispatchToProps)(Workspace))
);
