import React from 'react';
import Message from './Message';

const MessagesList = ({
  messages,
  history,
  location,
  ...props
}) => (
  messages && messages.map(message => (
    <Message key={message.slug} message={message} {...props} />
  ))
);

export default MessagesList;
