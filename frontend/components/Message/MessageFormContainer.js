import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { createMessage } from '../../actions/messageActions';
import { selectChannelIdBySlug } from '../../reducers/selectors';

const mapStateToDispatch = state => ({
  channelId: selectChannelIdBySlug(state),
});

const mapDispatchToProps = dispatch => ({
  createMessageRequest: message => dispatch(createMessage.request(message))
});

export default connect(mapStateToDispatch, mapDispatchToProps)(MessageForm);
