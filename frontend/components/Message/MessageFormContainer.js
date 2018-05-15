import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { createMessageRequest } from '../../actions/messageActions';

const mapStateToDispatch = (state, ownProps) => ({
  channelSlug: state.ui.displayChannelSlug,
  parentMessageSlug: ownProps.parentMessageSlug || null,
  errors: state.errors.message
});

const mapDispatchToProps = dispatch => ({
  createMessageRequest: message => dispatch(createMessageRequest(message)),
});

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(MessageForm);