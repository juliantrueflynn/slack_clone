import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import withEntityWrapper from './withEntityWrapper';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { modalClose } from '../actions/uiActions';
import { createReaction } from '../actions/reactionActions';
import { selectChannelsWithEntitiesMap } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = state => ({
  channels: selectChannelsWithEntitiesMap(state),
  workspaces: state.entities.workspaces,
  isLoading: state.ui.isWorkspaceLoading,
  modal: state.ui.displayModal,
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  modalClose: () => dispatch(modalClose()),
});

const entityProps = { entityName: 'workspaces', pathName: 'workspaceSlug' };

export default withActionCable(
  withEntityWrapper(entityProps)(connect(mapStateToProps, mapDispatchToProps)(Workspace))
);
