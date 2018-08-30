import React from 'react';
import Emojify from 'react-emojione';
import './Reactions.css';
import Button from './Button';

class Reactions extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(emoji) {
    const { createReactionRequest, messageId } = this.props;
    createReactionRequest({ emoji, messageId });
  }

  render() {
    const { reactions } = this.props;
    const emojiNames = Object.keys(reactions);

    if (!emojiNames) return null;

    return (
      <ul className="Reactions">
        {emojiNames.map(emoji => (
          <li className="Reactions__item" key={emoji}>
            <div className="Reactions__badge">
              <Button buttonFor="reaction" unStyled onClick={() => this.handleClick(emoji)}>
                <Emojify style={{ height: 17, width: 17 }}>
                  {`:${emoji}:`}
                </Emojify>
                {reactions[emoji].length}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Reactions;
