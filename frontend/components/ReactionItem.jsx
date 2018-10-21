import React from 'react';
import Emojify from 'react-emojione';
import classNames from 'classnames';
import Button from './Button';
import './ReactionItem.css';

const ReactionItem = ({ reactionStyle, reaction, createReaction }) => {
  const create = () => createReaction(reaction.emoji);
  const reactionClassNames = classNames('ReactionItem', {
    'Reactions__item--has-user': reaction.hasCurrentUser,
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
