import React from 'react';
import './MessageThreadAuthors.css';

const MessageThreadAuthors = ({ message, authors, currentUserSlug }) => {
  const authorSlugs = message.thread.reduce((acc, curr) => {
    if (currentUserSlug === curr.authorSlug || acc.includes(curr.authorSlug)) {
      return acc;
    }

    acc.push(curr.authorSlug);
    return acc;
  }, [message.authorSlug]);

  const authorsList = authorSlugs.map(slug => authors[slug].username);
  const seperator = authorsList.length === 1 ? ' ' : ', ';

  if (message.authorSlug !== currentUserSlug) {
    authorsList.push(' and you');
  }

  return (
    <div className="MessageThreadAuthors">
      {authorsList.join(seperator)}
    </div>
  );
};

export default MessageThreadAuthors;
