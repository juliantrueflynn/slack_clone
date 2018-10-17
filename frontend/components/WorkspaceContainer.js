import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import { fetchWorkspace, fetchWorkspaces } from '../actions/workspaceActions';
import { modalClose } from '../actions/uiActions';
import { createReaction } from '../actions/reactionActions';
import { selectChannelsWithEntitiesMap } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  workspaceSlug,
  channels: selectChannelsWithEntitiesMap(state),
  workspaces: state.entities.workspaces,
  isLoading: state.ui.isWorkspaceLoading,
  modal: state.ui.displayModal,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspaceRequest: workspaceSlug => dispatch(fetchWorkspace.request(workspaceSlug)),
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  modalClose: () => dispatch(modalClose()),
});

export default withActionCable(connect(mapStateToProps, mapDispatchToProps)(Workspace));
