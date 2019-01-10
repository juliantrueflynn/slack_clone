import React from 'react';
import Emojify from 'react-emojione';
import classNames from 'classnames';
import Button from './Button';
import './MessageReactionsItem.css';

const MessageReactionsItem = ({
  reaction,
  reactionStyle,
  currentUserSlug,
  toggleClick,
}) => {
  const reactionClassNames = classNames('MessageReactionsItem', {
    'MessageReactionsItem--has-user': reaction.userSlugs.includes(currentUserSlug),
  });

  return (
    <li className={reactionClassNames}>
      <Button
        buttonFor="reaction"
        data-emoji={reaction.emoji}
        onClick={toggleClick}
        unStyled
      >
        <Emojify style={reactionStyle} className="ReactionItem__emoji">
          {`:${reaction.emoji}:`}
        </Emojify>
        <div className="ReactionItem__counter">
          {reaction.userSlugs.length}
        </div>
      </Button>
    </li>
  );
};

export default MessageReactionsItem;
