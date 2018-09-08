import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AllThreads from './AllThreads';
import { fetchUserThreads } from '../actions/messageActions';
import { isModalOpen } from '../reducers/selectors';

const mapStateToProps = state => ({
  messages: state.entities.messages,
  members: state.entities.members,
  currentUserSlug: state.session.currentUser && state.session.currentUser.slug,
  isReactionModalOpen: isModalOpen(state, 'MODAL_REACTION'),
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
});

const mapDispatchToProps = dispatch => ({
  fetchUserThreadsRequest: () => dispatch(fetchUserThreads.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllThreads));
