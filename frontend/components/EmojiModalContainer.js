import { connect } from 'react-redux';
import EmojiModal from './EmojiModal';
import { createReaction } from '../actions/reactionActions';
import { modalClose } from '../actions/interactiveActions';
import { selectModalProps, isModalOpen } from '../reducers/selectors';

const mapStateToProps = state => ({
  modalProps: selectModalProps(state),
  isOpen: isModalOpen(state, 'MODAL_REACTION'),
});

const mapDispatchToProps = dispatch => ({
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  modalClose: () => dispatch(modalClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmojiModal);
