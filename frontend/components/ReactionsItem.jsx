import React from 'react';
import Emojify from 'react-emojione';
import classNames from 'classnames';
import Button from './Button';
import './ReactionsItem.css';

const ReactionItem = ({
  reactionStyle,
  reaction,
  createReaction,
  currUserId,
}) => {
  const create = () => createReaction(reaction.emoji);
  const reactionClassNames = classNames('ReactionsItem', {
    'ReactionsItem--has-user': reaction.users.includes(currUserId),
  });

  return (
    <li className={reactionClassNames}>
      <Button buttonFor="reaction" unStyled onClick={create}>
        <Emojify style={reactionStyle} className="ReactionItem__emoji">
          {`:${reaction.emoji}:`}
        </Emojify>
        <div className="ReactionItem__counter">
          {reaction.users.length}
        </div>
      </Button>
    </li>
  );
};

export default ReactionItem;
