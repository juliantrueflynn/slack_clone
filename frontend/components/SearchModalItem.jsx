import React from 'react';
import MessageContainer from './MessageContainer';
import { dateUtil } from '../util/dateUtil';
import './SearchModalItem.css';

const SearchModalItem = ({ message, channels, users }) => {
  const channel = channels[message.channelSlug];
  const channelTitle = channel && channel.title;
  const date = dateUtil(message.createdAt);
  const monthCreated = date.monthName();
  const dayCreated = date.dayOrdinal();
  const dateCreated = `${monthCreated} ${dayCreated}`;

  return (
    <div className="SearchModalItem" role="listitem">
      <div className="SearchModalItem__meta">
        <span className="SearchModalItem__meta-channel">
          <span className="SearchModalItem__meta-hashtag">#</span>
          <strong>{channelTitle}</strong>
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
        hasNoHoverMenu
      />
    </div>
  );
};

export default SearchModalItem;
