import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageThread from './MessageThread';
import { selectEntityBySlug } from '../reducers/selectors';
import { fetchMessage } from '../actions/messageActions';

const mapStateToProps = (state, { match: { params: { messageSlug, channelSlug } } }) => ({
  message: state.entities.messages[messageSlug],
  messages: state.entities.messages,
  messageSlug,
  authors: state.entities.members,
  channel: selectEntityBySlug(state, 'channels', channelSlug),
});

const mapDispatchToProps = dispatch => ({
  fetchMessageRequest: messageSlug => dispatch(fetchMessage.request(messageSlug)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageThread));
