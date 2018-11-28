import React from 'react';
import ReactionItem from './ReactionsItem';
import './Reactions.css';

class Reactions extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(emoji) {
    const { createReaction, messageId } = this.props;
    createReaction({ emoji, messageId });
  }

  render() {
    const { reactions, currUserId } = this.props;

    const reactionStyle = {
      height: 17,
      width: 17,
      top: 0,
      display: 'block',
    };

    const reactionCounts = reactions.reduce((acc, curr) => {
      if (!acc[curr.emoji]) {
        acc[curr.emoji] = { users: [] };
      }

      acc[curr.emoji].emoji = curr.emoji;
      acc[curr.emoji].users.push(curr.userId);

      return acc;
    }, {});

    const reactionItems = Object.values(reactionCounts);

    return (
      <ul className="Reactions">
        {reactionItems.map(reaction => (
          <ReactionItem
            key={reaction.emoji}
            reactionStyle={reactionStyle}
            createReaction={this.handleClick}
            reaction={reaction}
            currUserId={currUserId}
          />
        ))}
      </ul>
    );
  }
}

export default Reactions;
