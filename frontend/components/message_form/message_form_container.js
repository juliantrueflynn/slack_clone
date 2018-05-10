import { connect } from 'react-redux';
import MessageForm from './message_form';
import { createMessage } from '../../actions/message_actions';
import { getCurrentChannelId } from '../../reducers/selectors';

const mapStateToDispatch = (state, ownProps) => ({
  authorId: state.session.currentUser ? state.session.currentUser.id : null,
  channelId: getCurrentChannelId(state),
  parentMessageId: ownProps.parentMessageId || null,
});

const mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
});

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(MessageForm);