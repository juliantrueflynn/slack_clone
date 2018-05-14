import React from 'react';
import ThreadMessageContainer from './ThreadMessageContainer';
import MessageFormContainer from './MessageFormContainer';

const MessageThread = ({ message, threadEntries }) => {
  return (
    <div className="thread">
      <div className="thread__message">
        <div>{message.authorSlug}</div>
        <div>{message.body}</div>
      </div>
      <div className="thread-entries">
        {threadEntries.map(entry =>
          <ThreadMessageContainer key={entry.slug} message={entry} />
        )}
      </div>

      <MessageFormContainer parentMessageSlug={message.slug} />
    </div>
  );
};

export default MessageThread;