import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from '../util/dateUtil';
import './ChatsModalItem.css';

const ChatsModalItem = ({ channel, workspaceSlug }) => {
  const {
    slug,
    createdAt,
    ownerName,
    title,
  } = channel;

  const channelUrl = `/${workspaceSlug}/messages/${slug}`;
  const dateCreated = dateUtil(createdAt).monthDayYear();

  return (
    <Link role="listitem" className="ChatsModalItem" to={channelUrl}>
      <h3 className="ChatsModalItem__title">
        <FontAwesomeIcon icon="hashtag" className="ChatsModalItem__hashtag" size="xs" />
        {title}
      </h3>
      <div className="ChatsModalItem__body">
        <div className="ChatsModalItem__byline">
          {'Created by '}
          <strong>
            {ownerName}
          </strong>
          {` on ${dateCreated}`}
        </div>
      </div>
    </Link>
  );
};

export default ChatsModalItem;
