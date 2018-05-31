import React from 'react';
import './Reactions.css';

class Reactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reactions } = this.props;
    const emojiNames = Object.keys(reactions);

    if (!emojiNames) {
      return null;
    }

    return (
      <ul className="reactions">
        {emojiNames.map(emoji => (
          <li className="reactions__item" key={emoji}>
            {emoji} ({reactions[emoji].length}) 
          </li>
        ))}
      </ul>
    );
  }
}

export default Reactions;