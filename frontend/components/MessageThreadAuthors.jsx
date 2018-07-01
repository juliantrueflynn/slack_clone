import React from 'react';
import MessageThreadAuthor from './MessageThreadAuthor';

const MessageThreadAuthors = ({ members, messages, ...props }) => {
  if (!props.messageThread || !props.messageThread.length) {
    return null;
  }

  const authorSlugs = props.messageThread.map(childSlug => (
    messages[childSlug] && messages[childSlug].authorSlug
  )).filter((authorSlug, pos, self) => (
    self.indexOf(authorSlug) === pos && props.currentUserSlug !== authorSlug
  ));

  return (
    <div className="msg-thread-authors">
      {authorSlugs.map(authorSlug => (
        <MessageThreadAuthor
          key={authorSlug}
          authorSlug={authorSlug}
          authorSlugs={authorSlugs}
          members={members}
        />
      ))}
      <span>and you</span>
    </div>
  );
};

export default MessageThreadAuthors;
