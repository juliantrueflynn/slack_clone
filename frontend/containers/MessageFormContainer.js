import { connect } from 'react-redux';
import { createMessage } from '../actions/messageActions';
import MessageForm from '../components/MessageForm';

const mapDispatchToProps = dispatch => ({
  createMessageRequest: message => dispatch(createMessage.request(message)),
});

export default connect(null, mapDispatchToProps)(MessageForm);
