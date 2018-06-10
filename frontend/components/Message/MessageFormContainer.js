import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { createMessage } from '../../actions/messageActions';

const mapStateToDispatch = (state, ownProps) => ({
  channelSlug: state.ui.displayChannelSlug,
  parentMessageId: ownProps.parentMessageId || null,
});

const mapDispatchToProps = dispatch => ({
  createMessageRequest: message => dispatch(createMessage.request(message)),
});

export default connect(mapStateToDispatch, mapDispatchToProps)(MessageForm);
