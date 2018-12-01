import React from 'react';
import ReactionItem from './ReactionsItem';

class Reactions extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick(emoji) {
    const { messageSlug, toggleReaction } = this.props;
    toggleReaction({ emoji, messageSlug });
  }

  render() {
    const { reactions, currentUserId } = this.props;

    if (!reactions || !reactions.length) {
      return null;
    }

    const reactionCounts = reactions.reduce((acc, curr) => {
      if (!acc[curr.emoji]) {
        acc[curr.emoji] = { userSlugs: [] };
      }

      acc[curr.emoji].emoji = curr.emoji;
      acc[curr.emoji].userSlugs.push(curr.userSlug);

      return acc;
    }, {});

    const reactionItems = Object.values(reactionCounts);

    const style = {
      display: 'flex',
      flexDirection: 'row',
      margin: '6px 0 0',
    };

    const reactionEmojiStyle = {
      height: 17,
      width: 17,
      top: 0,
      display: 'block',
    };

    return (
      <ul className="Reactions" style={style}>
        {reactionItems.map(reaction => (
          <ReactionItem
            key={reaction.emoji}
            reactionStyle={reactionEmojiStyle}
            toggleClick={this.handleToggleClick}
            currentUserId={currentUserId}
            reaction={reaction}
          />
        ))}
      </ul>
    );
  }
}

export default Reactions;
