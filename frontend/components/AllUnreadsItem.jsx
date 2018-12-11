import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isDateOlderThanOther } from '../util/dateUtil';
import Button from './Button';
import MessagesListContainer from './MessagesListContainer';
import './AllUnreadsItem.css';

const AllUnreadsItem = ({
  channel,
  messages,
  unreadsMap,
  clearChannelUnreads,
}) => {
  const unreadMessages = channel.messages.reduce((acc, curr) => {
    acc.push(messages[curr]);
    return acc;
  }, []).filter(msg => (
    isDateOlderThanOther(unreadsMap[channel.slug].lastRead, msg.createdAt)
      && msg.entityType === 'entry'
  ));

  const msgsLenTxt = `${unreadMessages.length} messages`;

  return (
    <div className="AllUnreadsItem" role="listitem">
      <header className="AllUnreadsItem__header">
        <FontAwesomeIcon className="AllUnreadsItem__title-hashtag" icon="hashtag" size="sm" />
        <h3 className="AllUnreadsItem__title">{channel.title}</h3>
        <div className="AllUnreadsItem__meta">
          <div className="AllUnreadsItem__length">{msgsLenTxt}</div>
          <Button buttonFor="unread" size="sm" onClick={() => clearChannelUnreads(channel)}>
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
