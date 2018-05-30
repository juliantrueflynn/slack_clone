import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import {
  updateMessageRequest,
  deleteMessageRequest
} from '../../actions/messageActions';
import { openRightSidebar } from '../../actions/rightSidebarActions';
import {
  createFavoriteRequest,
  deleteFavoriteRequest
} from '../../actions/favoriteActions';
import { getFavoriteStatus } from '../../reducers/selectors';
import {
  createReactionRequest,
  deleteReactionRequest
} from '../../actions/reactionActions';

const mapStateToProps = (state, { message }) => ({
  isAuthor: state.session.currentUser.id === message.authorId,
  isFavorited: getFavoriteStatus(state, message.slug)
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessageRequest(message)),
  deleteMessageRequest: messageSlug => dispatch(
    deleteMessageRequest(messageSlug)
  ),
  openRightSidebar: sidebarProps => dispatch(
    openRightSidebar('Thread', sidebarProps)
  ),
  createFavoriteRequest: messageId => dispatch(
    createFavoriteRequest(messageId)
  ),
  deleteFavoriteRequest: messageId => dispatch(
    deleteFavoriteRequest(messageId)
  ),
  createReactionRequest: reaction => dispatch(
    createReactionRequest(reaction)
  ),
  deleteReactionRequest: reactionId => dispatch(
    deleteReactionRequest(reactionId)
  )
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Message)
);