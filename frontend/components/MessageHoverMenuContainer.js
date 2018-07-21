import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageHoverMenu from './Message/MessageHoverMenu';
import { deleteMessage } from '../actions/messageActions';
import { createFavorite, deleteFavorite } from '../actions/favoriteActions';
import { deleteReaction, createReaction } from '../actions/reactionActions';

const mapStateToProps = (state, { message }) => ({
  isAuthor: state.session.currentUser.id === message.authorId,
  isFavorited: !!message.favoriteId,
  openThreadSlug: state.ui.displayMessageSlug,
});

const mapDispatchToProps = dispatch => ({
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  createFavoriteRequest: favorite => dispatch(createFavorite.request(favorite)),
  deleteFavoriteRequest: favoriteId => dispatch(deleteFavorite.request(favoriteId)),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  deleteReactionRequest: reactionId => dispatch(deleteReaction.request(reactionId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageHoverMenu));
