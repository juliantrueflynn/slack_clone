import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import { updateMessage, deleteMessage } from '../../actions/messageActions';
import { openRightSidebar } from '../../actions/sidebarActions';
import { createFavorite, deleteFavorite } from '../../actions/favoriteActions';
import { getFavoriteStatus, getReactionCounts } from '../../reducers/selectors';
import { createReaction, deleteReaction } from '../../actions/reactionActions';

const mapStateToProps = (state, { message }) => ({
  isAuthor: state.session.currentUser.id === message.authorId,
  isFavorited: getFavoriteStatus(state, message.slug),
  reactions: getReactionCounts(state, message.id),
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  openRightSidebar: sidebarProps => dispatch(openRightSidebar('Thread', sidebarProps)),
  createFavoriteRequest: messageSlug => dispatch(createFavorite.request(messageSlug)),
  deleteFavoriteRequest: messageSlug => dispatch(deleteFavorite.request(messageSlug)),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  deleteReactionRequest: reactionId => dispatch(deleteReaction.request(reactionId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
