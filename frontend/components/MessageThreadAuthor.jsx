import React from 'react';

const MessageThreadAuthor = ({ authorSlug, authorSlugs, ...props }) => {
  const author = props.members[authorSlug];

  if (!author || !authorSlug) {
    return null;
  }

  return (
    <span key={author.id}>
      {author && author.username}
      {authorSlugs.length === 1 ? ' ' : ', '}
    </span>
  );
};

export default MessageThreadAuthor;
