import { connect } from 'react-redux';
import AllThreads from './AllThreads';
import { fetchUserThreads } from '../actions/messageActions';
import withChat from './withChat';

const mapStateToProps = state => ({
  messages: state.entities.messages,
  members: state.entities.members,
  currentUserSlug: state.session.currentUser && state.session.currentUser.slug,
});

const mapDispatchToProps = dispatch => ({
  fetchUserThreadsRequest: () => dispatch(fetchUserThreads.request()),
});

const chatProps = { chatClassName: 'threads', chatTitle: 'All Threads' };

export default withChat(chatProps)(connect(mapStateToProps, mapDispatchToProps)(AllThreads));
