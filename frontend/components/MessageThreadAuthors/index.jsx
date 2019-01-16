import React from 'react';
import './styles.css';

const MessageThreadAuthors = ({
  parentAuthorSlug,
  authors,
  users,
  currentUserSlug,
}) => {
  if (!authors) {
    return null;
  }

  if (authors.every(userSlug => userSlug === currentUserSlug)) {
    return <div className="MessageThreadAuthors">just you</div>;
  }

  const parentAuthor = users[parentAuthorSlug];
  const parentUsername = parentAuthor && parentAuthor.username;

  const authorsNames = authors.filter(slug => (
    slug !== currentUserSlug && slug !== parentUsername
  )).reduce((acc, curr) => {
    acc.push(users[curr].username);
    return acc;
  }, []);

  const seperator = authorsNames.length === 1 ? ' ' : ', ';

  authorsNames.push(' and you');

  return <div className="MessageThreadAuthors">{authorsNames.join(seperator)}</div>;
};

export default MessageThreadAuthors;
