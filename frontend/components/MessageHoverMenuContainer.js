import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageHoverMenu from './Message/MessageHoverMenu';
import { getFavoriteStatus } from '../reducers/selectors';
import { deleteMessage } from '../actions/messageActions';
import { createFavorite, deleteFavorite } from '../actions/favoriteActions';
import { deleteReaction, createReaction } from '../actions/reactionActions';

const mapStateToProps = (state, { message }) => ({
  isAuthor: state.session.currentUser.id === message.authorId,
  isFavorited: getFavoriteStatus(state, message.slug),
  openThreadSlug: state.ui.displayMessageSlug,
});

const mapDispatchToProps = dispatch => ({
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  createFavoriteRequest: messageSlug => dispatch(createFavorite.request(messageSlug)),
  deleteFavoriteRequest: messageSlug => dispatch(deleteFavorite.request(messageSlug)),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  deleteReactionRequest: reactionId => dispatch(deleteReaction.request(reactionId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageHoverMenu));
