import React from 'react';
import MessageContainer from './Message/MessageContainer';

const UnreadEntry = ({ messages, authors }) => {
  if (!messages) {
    return null;
  }

  return (
    <div className="unread-channel-entries">
      {Object.values(messages).map(message => (
        <MessageContainer
          key={message.slug}
          author={authors[message.authorSlug]}
          message={message}
        />
      ))}
    </div>
  );
};

export default UnreadEntry;
