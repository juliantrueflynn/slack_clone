import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from '../util/dateUtil';
import Message from './Message';
import './ModalSearchItem.css';

const ModalSearchItem = ({ message, chatroomsMap, url }) => {
  const date = dateUtil(message.createdAt);
  const monthCreated = date.monthName();
  const dayCreated = date.dayOrdinal();
  const dateCreated = `${monthCreated} ${dayCreated}`;

  const hasThread = !!message.thread;
  let threadCount = message.thread;
  if (hasThread) {
    threadCount += message.thread === 1 ? ' reply' : ' replies';
  }

  const hasReactions = !!message.reactionIds.length;
  let reactionCount = message.reactionIds.length;
  if (hasReactions) {
    reactionCount += message.reactionIds.length === 1 ? ' reaction' : ' reactions';
  }

  return (
    <div className="ModalSearchItem" role="listitem">
      <div className="ModalSearchItem__meta">
        <span className="ModalSearchItem__meta-channel">
          <span className="ModalSearchItem__meta-hashtag">#</span>
          <strong>{chatroomsMap[message.chatroomSlug].title}</strong>
        </span>
        <span className="ModalSearchItem__meta-sep">–</span>
        <span className="ModalSearchItem__meta-date">
          {dateCreated}
        </span>
      </div>
      <Message message={message} url={url} shouldHideEngagement />
      {(hasThread || hasReactions) && (
        <div className="ModalSearchItem__social">
          {hasThread && (
            <div className="ModalSearchItem__threads">
              <FontAwesomeIcon icon={['far', 'comment']} />
              {threadCount}
            </div>
          )}
          {hasReactions && (
            <div className="ModalSearchItem__reactions">
              <FontAwesomeIcon icon="{['far', 'smile']}" />
              {reactionCount}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalSearchItem;
