import React from 'react';
import './MessageThreadAuthors.css';

const MessageThreadAuthors = ({
  authors,
  messageThread,
  currentUserSlug,
}) => {
  const authorSlugs = messageThread.map(msg => msg.authorSlug).filter((val, i, self) => (
    self.indexOf(val) === i && currentUserSlug !== val
  ));

  const authorList = authorSlugs.reduce((acc, curr) => {
    acc.push(authors[curr].username);
    return acc;
  }, []);
  authorList.push('and you');

  const seperator = authorSlugs.length === 1 ? ' ' : ', ';

  return (
    <div className="MessageThreadAuthors">
      {authorList.join(seperator)}
    </div>
  );
};

export default MessageThreadAuthors;
