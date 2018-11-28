import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import PopoverOverlayHandler from './PopoverOverlayHandler';
import './ReactionModal.css';

class ReactionModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(_, emoji) {
    const { modalProps: { messageId }, createReactionRequest } = this.props;
    const reaction = { messageId, emoji: emoji.name };
    createReactionRequest(reaction);
  }

  render() {
    const { modalProps, modalClose } = this.props;

    if (!modalProps) {
      return null;
    }

    const { clickPosX, clickPosY } = modalProps;
    const posX = clickPosX - 560;

    let posY = clickPosY - 333;
    if (posY - 50 < 0) {
      posY = 70;
    }

    const style = {
      top: `${posY}px`,
      left: `${posX}px`
    };

    return (
      <PopoverOverlayHandler onOverlayClick={modalClose}>
        <div className="ReactionModal" style={style}>
          <EmojiPicker onEmojiClick={this.handleClick} disableDiversityPicker />
        </div>
      </PopoverOverlayHandler>
    );
  }
}

export default ReactionModal;
