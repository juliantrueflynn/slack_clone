import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ThreadsPage from './ThreadsPage';
import { fetchUserThreads } from '../actions/messageActions';

const mapStateToProps = state => ({
  messages: state.entities.messages,
  members: state.entities.members,
  currentUserSlug: state.session.currentUser && state.session.currentUser.slug
});

const mapDispatchToProps = dispatch => ({
  fetchUserThreadsRequest: () => dispatch(fetchUserThreads.request()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThreadsPage));
