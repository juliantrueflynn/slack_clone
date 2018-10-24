import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageContainer from './MessageContainer';
import { dateUtil } from '../util/dateUtil';
import './SearchModalItem.css';

const SearchModalItem = ({ message, users }) => {
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
    <div className="SearchModalItem" role="listitem">
      <div className="SearchModalItem__meta">
        <span className="SearchModalItem__meta-channel">
          <span className="SearchModalItem__meta-hashtag">#</span>
          <strong>{message.channelTitle}</strong>
        </span>
        <span className="SearchModalItem__meta-sep">–</span>
        <span className="SearchModalItem__meta-date">
          {dateCreated}
        </span>
      </div>
      <MessageContainer
        message={message}
        users={users}
        isThreadHidden
        isSearch
      >
        {(hasThread || hasReactions) && (
          <div className="SearchModalItem__social">
            {hasThread && (
              <div className="SearchModalItem__threads">
                <FontAwesomeIcon icon={['far', 'comment']} />
                {threadCount}
              </div>
            )}
            {hasReactions && (
              <div className="SearchModalItem__reactions">
                <FontAwesomeIcon icon={['far', 'smile']} />
                {reactionCount}
              </div>
            )}
          </div>
        )}
      </MessageContainer>
    </div>
  );
};

export default SearchModalItem;
