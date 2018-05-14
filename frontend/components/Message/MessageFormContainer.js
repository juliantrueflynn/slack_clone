import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { createMessage } from '../../actions/messageActions';

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