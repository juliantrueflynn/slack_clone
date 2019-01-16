import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChannelScrollBar from '../components/ChannelScrollBar';
import { updateScrollLocation, updateModal } from '../actions/uiActions';
import { fetchMessages } from '../actions/messageActions';
import { getChatroomViewMessages } from '../reducers/selectors';

const mapStateToProps = (state, { match: { params: { chatroomSlug } } }) => {
  const messages = getChatroomViewMessages(state);
  const firstMessage = messages.sort((a, b) => a.id - b.id)[0] || {};

  return {
    messages,
    firstMessage,
    chatroom: state.entities.chatrooms[chatroomSlug],
    isFetching: state.isLoading.messages,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { chatroomSlug } } }) => ({
  fetchHistoryRequest: lastId => dispatch(fetchMessages.request(chatroomSlug, lastId)),
  updateScrollLocation: (chSlug, scrollLoc) => (
    dispatch(updateScrollLocation(chSlug, scrollLoc))
  ),
  openModal: modalType => dispatch(updateModal(modalType, null)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelScrollBar));
