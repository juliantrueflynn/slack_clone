import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageContainer from './MessageContainer';
import './AllUnreadsItem.css';

const AllUnreadsItem = ({ channel, messages, authors }) => {
  const unreadMessages = channel.messages.reduce((acc, curr) => {
    acc[curr] = messages[curr];
    return acc;
  }, {});
  const messagesArray = Object.values(unreadMessages);

  return (
    <div className="AllUnreadsItem">
      <header className="AllUnreadsItem__header">
        <FontAwesomeIcon className="AllUnreadsItem__title-hashtag" icon="hashtag" size="sm" />
        <h3 className="AllUnreadsItem__title">
          {channel.title}
        </h3>
      </header>
      <div className="AllUnreadsItem__body">
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

export default AllUnreadsItem;
