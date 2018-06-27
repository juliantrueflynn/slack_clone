import { connect } from 'react-redux';
import MessageForm from './MessageForm';
import { createMessage, createThreadMessage } from '../../actions/messageActions';

const mapStateToDispatch = state => ({
  channelSlug: state.ui.displayChannelSlug,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.parentMessageSlug) {
    return {
      createEntryRequest: (message, parentMessageSlug) => (
        dispatch(createThreadMessage.request(message, parentMessageSlug))
      )
    };
  }

  return { createEntryRequest: message => dispatch(createMessage.request(message)) };
};

export default connect(mapStateToDispatch, mapDispatchToProps)(MessageForm);
