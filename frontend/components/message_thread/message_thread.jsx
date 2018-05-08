import React from 'react';
import ThreadMessageContainer from '../thread_message/thread_message_container';
import MessageFormContainer from '../message_form/message_form_container';

const MessageThread = props => {
  return (
    <div className="message-thread">
      <div className="thread-message">
        <div>{ props.message.authorId }</div>
        <div>{ props.message.body }</div>
      </div>
      <div className="message-thread__entries">
        {props.threadEntries.map(message =>
          <ThreadMessageContainer key={ message.id } message={ message } />
        )}
      </div>

      <MessageFormContainer parentMessageId={ props.message.id } />
    </div>
  );
};

export default MessageThread;