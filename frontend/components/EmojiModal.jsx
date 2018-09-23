import React from 'react';
import onClickOutside from 'react-onclickoutside';
import EmojiPicker from 'emoji-picker-react';
import './EmojiModal.css';

class EmojiModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClickOutside() {
    const { modalClose } = this.props;
    modalClose();
  }

  handleClick(_, emoji) {
    const { modal: { modalProps: { messageId } }, createReactionRequest } = this.props;
    const reaction = { messageId, emoji: emoji.name };
    createReactionRequest(reaction);
  }

  render() {
    const { modal: { modalType, modalProps } } = this.props;

    if (modalType !== 'MODAL_REACTION' || !modalProps) return null;

    const posX = modalProps.clickPosX - 580;

    let posY = modalProps.clickPosY - 343;
    if (posY - 20 < 0) {
      posY = 15;
    }

    const style = { top: `${posY}px`, left: `${posX}px` };

    return (
      <div className="EmojiModal" style={style}>
        <EmojiPicker onEmojiClick={this.handleClick} disableDiversityPicker />
      </div>
    );
  }
}

export default onClickOutside(EmojiModal);
