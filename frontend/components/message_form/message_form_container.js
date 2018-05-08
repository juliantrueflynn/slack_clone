import { connect } from 'react-redux';
import MessageForm from './message_form';
import { createMessage } from '../../actions/message_actions';
import { getChannelPageId } from '../../reducers/selectors';

const mapStateToDispatch = (state, ownProps) => ({
  authorId: state.session.currentUser.id,
  channelId: getChannelPageId(state),
  parentMessageId: ownProps.parentMessageId || null,
  isParent: Boolean(ownProps.parentMessageId),
});

const mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
});

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(MessageForm);