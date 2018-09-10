import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageThread from './MessageThread';
import { selectThreadFromSlug, selectChatBySlug } from '../reducers/selectors';
import { updateRead } from '../actions/readActions';
import { fetchMessage } from '../actions/messageActions';

const mapStateToProps = (state, { match: { params: { messageSlug, channelSlug } } }) => ({
  threadMessages: selectThreadFromSlug(state),
  message: state.entities.messages[messageSlug],
  messageSlug,
  authors: state.entities.members,
  channel: selectChatBySlug(state, channelSlug)
});

const mapDispatchToProps = dispatch => ({
  fetchMessageRequest: messageSlug => dispatch(fetchMessage.request(messageSlug)),
  updateReadRequest: read => dispatch(updateRead.request(read)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageThread));
