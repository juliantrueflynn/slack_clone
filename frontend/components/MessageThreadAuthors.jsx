import React from 'react';

const MessageThreadAuthors = ({
  parentAuthorSlug,
  authors,
  users,
  currentUserSlug,
}) => {
  if (!authors) {
    return null;
  }

  const parentUsername = users[parentAuthorSlug] && users[parentAuthorSlug].username;
  const authorsNames = authors.reduce((acc, curr) => {
    if (curr !== currentUserSlug) {
      acc.push(users[curr].username);
    }

    return acc;
  }, [parentUsername]);

  const seperator = authorsNames.length === 1 ? ' ' : ', ';

  if (parentAuthorSlug !== currentUserSlug) {
    authorsNames.push(' and you');
  }

  const style = {
    display: 'flex',
    fontSize: '13px',
    color: '#636E72',
    margin: '2px 0 4px',
  };

  return (
    <div className="MessageThreadAuthors" style={style}>
      {authorsNames.join(seperator)}
    </div>
  );
};

export default MessageThreadAuthors;
