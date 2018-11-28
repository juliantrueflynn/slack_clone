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
      top: `${posY}px`,
      left: `${posX}px`,
      zIndex: 999,
      position: 'absolute',
      boxShadow: '0px 3px 6px 0px rgba(0,0,0,0.15)',
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
