import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import { updateMessage, deleteMessage } from '../../actions/messageActions';
import { createFavorite, deleteFavorite } from '../../actions/favoriteActions';
import { getFavoriteStatus, getReactionCounts, selectThreadLastUpdate } from '../../reducers/selectors';
import { createReaction, deleteReaction } from '../../actions/reactionActions';

const mapStateToProps = (state, { message }) => ({
  isAuthor: state.session.currentUser.id === message.authorId,
  isFavorited: getFavoriteStatus(state, message.slug),
  reactions: getReactionCounts(state, message.id),
  threadLastUpdate: message.thread ? selectThreadLastUpdate(state, message.thread) : null,
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  createFavoriteRequest: messageSlug => dispatch(createFavorite.request(messageSlug)),
  deleteFavoriteRequest: messageSlug => dispatch(deleteFavorite.request(messageSlug)),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  deleteReactionRequest: reactionId => dispatch(deleteReaction.request(reactionId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
