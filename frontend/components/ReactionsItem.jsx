import React from 'react';
import Emojify from 'react-emojione';
import classNames from 'classnames';
import Button from './Button';
import './ReactionsItem.css';

const ReactionItem = ({
  reaction,
  reactionStyle,
  currentUserSlug,
  toggleClick,
}) => {
  const reactionClassNames = classNames('ReactionsItem', {
    'ReactionsItem--has-user': reaction.userSlugs.includes(currentUserSlug),
  });

  return (
    <li className={reactionClassNames}>
      <Button buttonFor="reaction" unStyled onClick={() => toggleClick(reaction.emoji)}>
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

export default ReactionItem;
