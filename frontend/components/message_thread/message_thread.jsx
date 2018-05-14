import React from 'react';
import ThreadMessageContainer from '../thread_message/thread_message_container';
import MessageFormContainer from '../message_form/message_form_container';

const MessageThread = ({ message, threadEntries }) => {
  return (
    <div className="message-thread">
      <div className="thread-message">
        <div>{ message.authorSlug }</div>
        <div>{ message.body }</div>
      </div>
      <div className="message-thread__entries">
        {threadEntries.map(entry =>
          <ThreadMessageContainer key={ entry.slug } message={ entry } />
        )}
      </div>

      <MessageFormContainer parentMessageSlug={ message.slug } />
    </div>
  );
};

export default MessageThread;