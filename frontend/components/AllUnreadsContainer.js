import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AllUnreads from './AllUnreads';
import { fetchUnreads } from '../actions/readActions';
import { selectUnreadChannels, isModalOpen } from '../reducers/selectors';

const mapStateToProps = (state, { match: { params: { workspaceSlug } } }) => ({
  messages: state.entities.messages,
  unreadChannels: selectUnreadChannels(state),
  authors: state.entities.members,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  isReactionModalOpen: isModalOpen(state, 'MODAL_REACTION'),
  workspaceSlug,
});

const mapDispatchToProps = dispatch => ({
  fetchUnreadsRequest: workspaceId => dispatch(fetchUnreads.request(workspaceId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUnreads));
