import { connect } from 'react-redux';
import MessageForm from './message_form';
import { createMessage } from '../../actions/message_actions';

const mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
});

export default connect(
  null,
  mapDispatchToProps
)(MessageForm);