import { connect } from 'react-redux';
import MessageForm from './message_form';
import { createMessage } from '../../actions/message_actions';

const mapStateToDispatch = (state, ownProps) => ({
  channelSlug: state.ui.displayChannelSlug,
  parentMessageSlug: ownProps.parentMessageSlug || null,
});

const mapDispatchToProps = dispatch => ({
  createMessage: message => dispatch(createMessage(message)),
});

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(MessageForm);