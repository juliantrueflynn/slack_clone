import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import {
  updateMessage,
  deleteMessage,
  createPin,
  destroyPin,
} from '../actions/messageActions';
import { deleteReaction, createReaction } from '../actions/reactionActions';
import { selectMessageChildrenBySlug } from '../reducers/selectors';
import { modalOpen } from '../actions/uiActions';
import { deleteFavorite, createFavorite } from '../actions/favoriteActions';

const mapStateToProps = (state, { message }) => ({
  reactions: Object.values(state.entities.reactions),
  isReactionModalOpen: state.ui.displayModal.modalType === 'MODAL_REACTION',
  threadMessages: selectMessageChildrenBySlug(state, message.slug),
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  deleteReactionRequest: id => dispatch(deleteReaction.request(id)),
  createFavoriteRequest: favorite => dispatch(createFavorite.request(favorite)),
  deleteFavoriteRequest: favoriteId => dispatch(deleteFavorite.request(favoriteId)),
  createPinRequest: pin => dispatch(createPin.request(pin)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));
