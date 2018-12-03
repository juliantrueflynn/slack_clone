import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import Modal from './Modal';
import './ReactionModal.css';

class ReactionModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(_, emoji) {
    const { modalProps: { messageSlug }, toggleReaction, modalClose } = this.props;
    const reaction = { messageSlug, emoji: emoji.name };
    toggleReaction(reaction);
    modalClose();
  }

  render() {
    const { modalProps, modalClose } = this.props;

    const { clickPosX, clickPosY } = modalProps;
    const posX = clickPosX - 285;

    let posY = clickPosY - 333;
    if (posY - 50 < 0) {
      posY = 70;
    }

    const style = {
      content: {
        top: `${posY}px`,
        left: `${posX}px`,
        position: 'absolute',
      }
    };

    return (
      <Modal isOpen close={modalClose} style={style} unStyled hasNoWrappers>
        <EmojiPicker onEmojiClick={this.handleClick} disableDiversityPicker />
      </Modal>
    );
  }
}

export default ReactionModal;
