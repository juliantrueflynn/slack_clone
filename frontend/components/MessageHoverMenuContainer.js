import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageHoverMenu from './MessageHoverMenu';
import { deleteMessage } from '../actions/messageActions';
import { createFavorite, deleteFavorite } from '../actions/favoriteActions';
import { modalOpen, modalClose } from '../actions/interactiveActions';

const mapStateToProps = (state, { message }) => ({
  isAuthor: state.session.currentUser.id === message.authorId,
  isFavorited: !!message.favoriteId,
  openThreadSlug: state.ui.displayMessageSlug,
  isReactionModalOpen: state.ui.displayModal && state.ui.displayModal.modalType === 'MODAL_REACTION',
});

const mapDispatchToProps = dispatch => ({
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  createFavoriteRequest: favorite => dispatch(createFavorite.request(favorite)),
  deleteFavoriteRequest: favoriteId => dispatch(deleteFavorite.request(favoriteId)),
  modalOpen: modal => dispatch(modalOpen(modal)),
  modalClose: () => dispatch(modalClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageHoverMenu));
