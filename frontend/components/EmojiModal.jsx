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
    const { modalProps: { messageId }, createReactionRequest } = this.props;
    const reaction = { messageId, emoji: emoji.name };
    createReactionRequest(reaction);
  }

  render() {
    const { isOpen, modalProps } = this.props;

    if (!isOpen || !modalProps) return null;

    const { clickPos } = modalProps;
    let pos = clickPos - 343;
    if (pos - 70 < 0) pos = 60;
    const style = { top: `${pos}px` };

    return (
      <div className="EmojiModal" style={style}>
        <EmojiPicker onEmojiClick={this.handleClick} />
      </div>
    );
  }
}

export default onClickOutside(EmojiModal);
