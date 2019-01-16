import React from 'react';
import './styles.css';

const MessageThreadAuthors = ({
  parentAuthorSlug,
  authors,
  usersMap,
  currentUserSlug,
}) => {
  if (!authors) {
    return null;
  }

  if (authors.every(userSlug => userSlug === currentUserSlug)) {
    return <div className="MessageThreadAuthors">just you</div>;
  }

  const parentAuthor = usersMap[parentAuthorSlug];
  const parentUsername = parentAuthor && parentAuthor.username;

  const authorsNames = authors.filter(slug => (
    slug !== currentUserSlug && slug !== parentUsername
  )).reduce((acc, curr) => {
    const authorName = usersMap[curr].username;
    return [...acc, authorName];
  }, []);

  const seperator = authorsNames.length === 1 ? ' ' : ', ';

  authorsNames.push(' and you');

  return <div className="MessageThreadAuthors">{authorsNames.join(seperator)}</div>;
};

export default MessageThreadAuthors;
