import React from 'react';
import MessageContainer from './MessageContainer';

const MessagesList = ({ messages }) => {
  if (!messages || !messages.length) {
    return null;
  }

  return (
    <ul className="messages-list">
      {messages.map(message => (
        <li className="message" key={message.slug}>
          <MessageContainer message={message} />
        </li>
      ))}
    </ul>
  );
};

export default MessagesList;
