import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import { updateMessage } from '../actions/messageActions';
import { deleteReaction, createReaction } from '../actions/reactionActions';
import { getReactionCounts, selectThreadLastUpdate, isModalOpen } from '../reducers/selectors';

const mapStateToProps = (state, { message }) => ({
  reactions: message && getReactionCounts(state, message.slug),
  threadLastUpdate: message && message.thread && selectThreadLastUpdate(state, message.thread),
  isReactionModalOpen: isModalOpen(state, 'MODAL_REACTION'),
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
  deleteReactionRequest: id => dispatch(deleteReaction.request(id)),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
