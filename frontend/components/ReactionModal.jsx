import React from 'react';
import onClickOutside from 'react-onclickoutside';
import EmojiPicker from 'emoji-picker-react';
import './ReactionModal.css';

class ReactionModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    ReactionModal.setBodyClassList('add');
  }

  componentWillUnmount() {
    ReactionModal.setBodyClassList('remove');
  }

  static setBodyClassList(addOrRemove) {
    const bodyEl = document.querySelector('body');
    bodyEl.classList[addOrRemove]('popover-open');
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
    const { modalProps } = this.props;

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
      <div className="ReactionModal" style={style}>
        <EmojiPicker onEmojiClick={this.handleClick} disableDiversityPicker />
      </div>
    );
  }
}

export default onClickOutside(ReactionModal);
