import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import MessagesListContainer from '../../containers/MessagesListContainer';
import './styles.css';

const AllUnreadsItem = ({
  chatroom,
  clearChannelUnreads,
  messagesMap,
}) => {
  const msgsLenTxt = `${chatroom.unreadMessages && chatroom.unreadMessages.length} messages`;
  const messages = chatroom.unreadMessages.map(msgSlug => messagesMap[msgSlug]);

  return (
    <div className="AllUnreadsItem" role="listitem">
      <header className="AllUnreadsItem__header">
        <FontAwesomeIcon className="AllUnreadsItem__title-hashtag" icon="hashtag" size="sm" />
        <h3 className="AllUnreadsItem__title">{chatroom.title}</h3>
        <div className="AllUnreadsItem__meta">
          <div className="AllUnreadsItem__length">{msgsLenTxt}</div>
          <Button buttonFor="unread" size="sm" onClick={() => clearChannelUnreads(chatroom)}>
            Mark as Read
          </Button>
        </div>
      </header>
      <div className="AllUnreadsItem__body">
        <MessagesListContainer messages={messages} isHoverable />
      </div>
    </div>
  );
};

export default AllUnreadsItem;
