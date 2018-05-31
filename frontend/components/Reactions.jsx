import React from 'react';
import Emojify from 'react-emojione';
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
            <div className="reaction-badge">
              <Emojify style={{ height: 17, width: 17 }}>
                {`:${emoji}:`}
              </Emojify>
              
              {reactions[emoji].length}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Reactions;