import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import { updateMessage } from '../../actions/messageActions';
import { getReactionCounts, selectThreadLastUpdate } from '../../reducers/selectors';

const mapStateToProps = (state, { message }) => ({
  reactions: message && getReactionCounts(state, message.id),
  threadLastUpdate: message && message.thread && selectThreadLastUpdate(state, message.thread),
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
