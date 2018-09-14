import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { createMessage } from '../actions/messageActions';

const mapDispatchToProps = dispatch => ({
  createMessageRequest: message => dispatch(createMessage.request(message))
});

export default connect(null, mapDispatchToProps)(MessageForm);
