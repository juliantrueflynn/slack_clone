import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from '../util/dateUtil';
import MessageContainer from './MessageContainer';
import './PinnedMessagesItem.css';
import Button from './Button';

const PinnedMessagesItem = ({ message, destroyPinRequest }) => {
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
        <MessageContainer
          message={message}
          messageDate={messageDate}
          shouldHideEngagement
          shouldHideAvatar
        />
      </div>
    </div>
  );
};

export default PinnedMessagesItem;
