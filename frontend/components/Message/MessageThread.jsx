import React from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';

const MessageThread = ({ message, threadEntries }) => {
  return (
    <div className="thread">
      <div className="thread__message">
        <div>{message.authorSlug}</div>
        <div>{message.body}</div>
      </div>
      <div className="thread-entries">
        {threadEntries.map(entry => (
          <MessageContainer message={entry} key={entry.slug} />
        ))}
      </div>

      <MessageFormContainer parentMessageId={message.slug} />
    </div>
  );
};

export default MessageThread;