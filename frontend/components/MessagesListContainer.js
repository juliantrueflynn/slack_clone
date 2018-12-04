import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateMessage,
  deleteMessage,
  createPin,
  destroyPin,
  toggleMessageEditor,
} from '../actions/messageActions';
import { toggleReaction } from '../actions/reactionActions';
import { toggleFavorite } from '../actions/favoriteActions';
import { modalOpen, modalClose } from '../actions/uiActions';
import MessagesList from './MessagesList';

const mapStateToProps = (state, { match: { url } }) => ({
  currentUserSlug: state.session.currentUser.slug,
  users: state.entities.members,
  pinsMap: state.entities.pins,
  modalProps: state.ui.displayModal.modalProps,
  isDdOpen: state.ui.displayModal.modalType === 'MODAL_DROPDOWN_MESSAGE',
  url,
});

const mapDispatchToProps = dispatch => ({
  updateMessageRequest: message => dispatch(updateMessage.request(message)),
  deleteMessageRequest: messageSlug => dispatch(deleteMessage.request(messageSlug)),
  toggleReaction: reaction => dispatch(toggleReaction(reaction)),
  toggleFavorite: favorite => dispatch(toggleFavorite(favorite)),
  toggleMessageEditor: slug => dispatch(toggleMessageEditor(slug)),
  createPinRequest: pin => dispatch(createPin.request(pin)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
  modalClose: () => dispatch(modalClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesList));
