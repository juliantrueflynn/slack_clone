import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageContainer from './MessageContainer';
import './UnreadsItem.css';

const UnreadsItem = ({ channel, messages, authors }) => {
  const unreadMessages = channel.messages.reduce((acc, curr) => {
    acc[curr] = messages[curr];
    return acc;
  }, {});
  const messagesArray = Object.values(unreadMessages);

  return (
    <div className="UnreadsItem">
      <header className="UnreadsItem__header">
        <FontAwesomeIcon className="UnreadsItem__title-hashtag" icon="hashtag" size="sm" />
        <h3 className="UnreadsItem__title">
          {channel.title}
        </h3>
      </header>
      <div className="UnreadsItem__body">
        {messagesArray.map(message => (
          <MessageContainer
            key={message.id}
            author={authors[message.authorSlug]}
            message={message}
          />
        ))}
      </div>
    </div>
  );
};

export default UnreadsItem;
