import React from 'react';

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
      <div className="reactions">
        <ul className="reactions-list">
          {emojiNames.map(emoji => (
            <li key={emoji}>
              {emoji} ({reactions[emoji].length}) 
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Reactions;