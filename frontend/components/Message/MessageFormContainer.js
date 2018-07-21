import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { createMessage } from '../../actions/messageActions';
import { selectChatIdBySlug } from '../../reducers/selectors';

const mapStateToDispatch = state => ({
  channelId: selectChatIdBySlug(state),
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  createMessageRequest: message => dispatch(createMessage.request(message))
});

export default connect(mapStateToDispatch, mapDispatchToProps)(MessageForm);
