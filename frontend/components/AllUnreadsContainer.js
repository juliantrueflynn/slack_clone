import { connect } from 'react-redux';
import AllUnreads from './AllUnreads';
import { fetchUnreads } from '../actions/readActions';
import { selectUnreadChannels } from '../reducers/selectors';
import withChat from './withChat';

const mapStateToProps = state => ({
  messages: state.entities.messages,
  unreadChannels: selectUnreadChannels(state),
  authors: state.entities.members,
});

const mapDispatchToProps = dispatch => ({
  fetchUnreadsRequest: workspaceSlug => dispatch(fetchUnreads.request(workspaceSlug)),
});

const chatProps = { chatClassName: 'unreads', chatTitle: 'All Unreads' };

export default withChat(chatProps)(connect(mapStateToProps, mapDispatchToProps)(AllUnreads));
