import React from 'react';
import MessageContainer from '../Message/MessageContainer';

const MessageEntries = (props) => {
  const { messages } = props;

  return (
    <div>
      {messages && messages.map(message => (
        <MessageContainer message={message} key={message.slug} />
      ))}
    </div>
  );
};

export default MessageEntries;
