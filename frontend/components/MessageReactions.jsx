import React from 'react';
import MessageReactionsItem from './MessageReactionsItem';
import './MessageReactions.css';

class MessageReactions extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick(e) {
    const { messageSlug, toggleReaction } = this.props;
    const emoji = e.target.getAttribute('data-emoji');
    toggleReaction({ messageSlug, emoji });
  }

  render() {
    const { reactionIds, reactionsMap, currentUserSlug } = this.props;

    if (!reactionIds && !reactionIds.length) {
      return null;
    }

    const reactions = reactionIds.map(id => reactionsMap[id]);

    const reactionCounts = reactions.reduce((acc, curr) => {
      if (!acc[curr.emoji]) {
        acc[curr.emoji] = { userSlugs: [] };
      }

      acc[curr.emoji].emoji = curr.emoji;
      acc[curr.emoji].userSlugs.push(curr.userSlug);

      return acc;
    }, {});

    const reactionItems = Object.values(reactionCounts);

    const reactionEmojiStyle = {
      height: 17,
      width: 17,
      top: 0,
      display: 'block',
    };

    return (
      <ul className="MessageReactions">
        {reactionItems.map(reaction => (
          <MessageReactionsItem
            key={reaction.emoji}
            reactionStyle={reactionEmojiStyle}
            toggleClick={this.handleToggleClick}
            currentUserSlug={currentUserSlug}
            reaction={reaction}
          />
        ))}
      </ul>
    );
  }
}

export default MessageReactions;
