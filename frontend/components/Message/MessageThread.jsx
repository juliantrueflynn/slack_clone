import React from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';

const MessageThread = ({ message, threadEntries }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="thread">
      <div className="thread__message">
        <div>
          ID: {message.id}<br/>
          Slug: {message.slug}<br/>
          Author: {message.authorId}<br/>
          Body: {message.body}<br/>
        </div>
      </div>
      <div className="thread-entries">
        {threadEntries && threadEntries.map(entry => (
          <MessageContainer message={entry} key={entry.slug} />
        ))}
      </div>

      <MessageFormContainer parentMessageId={message.slug} />
    </div>
  );
};

export default MessageThread;