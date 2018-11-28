import { connect } from 'react-redux';
import withActionCable from './withActionCable';
import withEntityWrapper from './withEntityWrapper';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { fetchSearch, destroySearch, modalClose } from '../actions/uiActions';
import { toggleReaction } from '../actions/reactionActions';
import { fetchChannels } from '../actions/channelActions';
import { selectSubbedWorkspaces, selectMessages } from '../reducers/selectors';
import Workspace from './Workspace';

const mapStateToProps = (state, { workspaceSlug }) => ({
  workspace: state.entities.workspaces[workspaceSlug],
  chatPath: state.ui.displayChannelSlug,
  workspaces: selectSubbedWorkspaces(state),
  modal: state.ui.displayModal,
  searchQuery: state.ui.searchQuery,
  messages: selectMessages(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  toggleReaction: reaction => dispatch(toggleReaction(reaction)),
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  fetchSearchRequest: query => dispatch(fetchSearch.request(query)),
  destroySearch: () => dispatch(destroySearch()),
  modalClose: () => dispatch(modalClose()),
});

export default withActionCable(
  withEntityWrapper('workspaceSlug')(connect(mapStateToProps, mapDispatchToProps)(Workspace))
);
