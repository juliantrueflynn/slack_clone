import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from '../util/dateUtil';
import Message from './Message';
import Button from './Button';
import './PinnedMessagesItem.css';

const PinnedMessagesItem = ({
  message,
  currentUserId,
  users,
  url,
  destroyPinRequest,
}) => {
  const date = dateUtil(message.createdAt);
  const month = date.monthName();
  const day = date.dayOrdinal();
  const messageDate = `${month} ${day}`;

  const clickDestroy = () => destroyPinRequest(message.pinId);

  return (
    <div role="listitem" className="PinnedMessagesItem">
      <div className="PinnedMessagesItem__container">
        <Button buttonFor="destroy" onClick={clickDestroy} unStyled>
          <FontAwesomeIcon icon="times" />
        </Button>
        <Message
          message={message}
          messageDate={messageDate}
          users={users}
          currentUserId={currentUserId}
          url={url}
          shouldHideEngagement
          shouldHideAvatar
        />
      </div>
    </div>
  );
};

export default PinnedMessagesItem;
