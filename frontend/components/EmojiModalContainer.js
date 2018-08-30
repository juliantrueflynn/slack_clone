import { connect } from 'react-redux';
import EmojiModal from './EmojiModal';
import { deleteReaction, createReaction } from '../actions/reactionActions';
import { modalClose } from '../actions/interactiveActions';

const mapStateToProps = state => ({
  modalProps: state.ui.displayModal && state.ui.displayModal.modalProps,
  isOpen: state.ui.displayModal && state.ui.displayModal.modalType === 'MODAL_REACTION',
});

const mapDispatchToProps = dispatch => ({
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  deleteReactionRequest: reactionId => dispatch(deleteReaction.request(reactionId)),
  modalClose: () => dispatch(modalClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmojiModal);
