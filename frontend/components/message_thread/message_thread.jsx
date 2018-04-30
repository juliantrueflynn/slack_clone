import React from 'react';
import ThreadEntry from './message_thread_item';
import MessageFormContainer from '../message_form/message_form_container';

const MessageThread = ({ threadEntries, threadId, thread }) => {
  return (
    <div className="message-thread">
      <div className="thread-message">
        <div>{ thread.authorId }</div>
        <div>{ thread.body }</div>
      </div>
      <div className="message-thread__entries">
        {threadEntries.map(entry =>
          <ThreadEntry key={ entry.id } thread={ entry } />
        )}
      </div>

      <MessageFormContainer parentMessageId={ thread.id } />
    </div>
  );
};

export default MessageThread;