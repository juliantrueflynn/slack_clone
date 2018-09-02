import React from 'react';
import Emojify from 'react-emojione';
import Button from './Button';
import './Reactions.css';

class Reactions extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(emoji) {
    const { createReactionRequest, messageId } = this.props;
    createReactionRequest({ emoji, messageId });
  }

  itemClassNames(emoji) {
    const { reactions } = this.props;
    let classNames = 'Reactions__item';
    if (reactions[emoji].hasCurrentUser) classNames += ' Reactions__item--has-user';

    return classNames;
  }

  render() {
    const { reactions } = this.props;
    const emojiNames = Object.keys(reactions);

    if (!emojiNames || !emojiNames.length) return null;

    const emojiStyle = {
      height: 17,
      width: 17,
      top: 0,
      display: 'block',
    };

    return (
      <ul className="Reactions">
        {emojiNames.map(emoji => (
          <li className={this.itemClassNames(emoji)} key={emoji}>
            <Button buttonFor="reaction" unStyled onClick={() => this.handleClick(emoji)}>
              <Emojify style={emojiStyle} className="Reactions__emoji">
                {`:${emoji}:`}
              </Emojify>
              <div className="Reactions__counter">
                {reactions[emoji].users.length}
              </div>
            </Button>
          </li>
        ))}
      </ul>
    );
  }
}

export default Reactions;
