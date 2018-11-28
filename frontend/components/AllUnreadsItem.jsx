import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isDateOlderThanOther } from '../util/dateUtil';
import Button from './Button';
import MessagesListContainer from './MessagesListContainer';
import './AllUnreadsItem.css';

const AllUnreadsItem = ({ clearUnreads, channel, messages }) => {
  const clear = () => {
    const messageSlug = channel.messages[channel.messages.length - 1];
    const lastMessage = messages[messageSlug];
    clearUnreads(channel.slug, lastMessage.createdAt);
  };

  const unreadMessages = channel.messages.reduce((acc, curr) => {
    acc.push(messages[curr]);
    return acc;
  }, []).filter(message => (
    isDateOlderThanOther(channel.lastRead, message.createdAt)
    && message.entityType === 'entry'
  ));

  const messagesLengthText = `${unreadMessages.length} messages`;

  return (
    <div className="AllUnreadsItem" role="listitem">
      <header className="AllUnreadsItem__header">
        <FontAwesomeIcon className="AllUnreadsItem__title-hashtag" icon="hashtag" size="sm" />
        <h3 className="AllUnreadsItem__title">
          {channel.title}
        </h3>
        <div className="AllUnreadsItem__meta">
          <div className="AllUnreadsItem__length">
            {messagesLengthText}
          </div>
          <Button buttonFor="unread" size="sm" onClick={() => clear()}>
            Mark as Read
          </Button>
        </div>
      </header>
      <div className="AllUnreadsItem__body">
        <MessagesListContainer messages={unreadMessages} isHoverable />
      </div>
    </div>
  );
};

export default AllUnreadsItem;
