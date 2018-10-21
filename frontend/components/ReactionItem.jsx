import React from 'react';
import Emojify from 'react-emojione';
import classNames from 'classnames';
import Button from './Button';
import './ReactionItem.css';

const ReactionItem = ({
  emojiStyle,
  emoji,
  hasCurrentUser,
  users,
  createReaction,
}) => {
  const create = () => createReaction(emoji);

  const reactionClassNames = classNames('ReactionItem', {
    'Reactions__item--has-user': hasCurrentUser,
  });

  return (
    <li className={reactionClassNames}>
      <Button buttonFor="reaction" unStyled onClick={create}>
        <Emojify style={emojiStyle} className="ReactionItem__emoji">
          {`:${emoji}:`}
        </Emojify>
        <div className="ReactionItem__counter">
          {users.length}
        </div>
      </Button>
    </li>
  );
};

export default ReactionItem;
