import React, { Fragment } from 'react';

const MessageThreadAuthors = ({
  authors,
  messages,
  messageThread,
  currentUserSlug,
}) => {
  if (!messageThread) {
    return null;
  }

  const slugs = messageThread.map(slug => messages[slug].authorSlug).filter((val, pos, self) => (
    self.indexOf(val) === pos && currentUserSlug !== val
  ));

  const threadAuthor = (userSlug) => {
    const author = authors[userSlug];

    return (
      <Fragment>
        {author.username}
        {slugs.length === 1 ? ' ' : ', '}
      </Fragment>
    );
  };

  return (
    <div className="MessageThreadAuthors">
      {slugs.map(authorSlug => (
        <div className="MessageThreadAuthor__item" key={authorSlug}>
          {threadAuthor(authorSlug)}
        </div>
      ))}
      <span>
        and you
      </span>
    </div>
  );
};

export default MessageThreadAuthors;
