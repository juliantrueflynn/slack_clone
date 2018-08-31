import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageThread from './MessageThread';
import { selectThreadFromSlug, selectAuthors, selectChatBySlug } from '../reducers/selectors';
import { readUpdate } from '../actions/readActions';
import { fetchMessage } from '../actions/messageActions';

const mapStateToProps = (state, { match: { params: { messageSlug, channelSlug } } }) => ({
  threadMessages: selectThreadFromSlug(state),
  message: state.entities.messages[messageSlug],
  messageSlug,
  authors: selectAuthors(state),
  chat: selectChatBySlug(state, channelSlug)
});

const mapDispatchToProps = dispatch => ({
  fetchMessageRequest: messageSlug => dispatch(fetchMessage.request(messageSlug)),
  readUpdateRequest: readableId => dispatch(readUpdate.request(readableId, 'Message')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageThread));
