import React from 'react';
import classNames from 'classnames';
import Message from './Message';

const MessagesList = ({
  messages,
  history,
  location,
  isHoverable,
  isDdOpen,
  isReactionDdOpen,
  ...props
}) => {
  const listClassNames = classNames('MessagesList', {
    'MessagesList--hoverable': isHoverable,
  });

  return (
    <div className={listClassNames}>
      {messages && messages.map(message => (
        <Message
          key={message.slug}
          message={message}
          isDdOpen={isDdOpen}
          isHoverable={isHoverable}
          {...props}
        />
      ))}
    </div>
  );
};

export default MessagesList;
