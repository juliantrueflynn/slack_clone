import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from '../util/dateUtil';
import './ChannelsListModalItem.css';

const ChannelsListModalItem = ({ channel, workspaceSlug }) => {
  const {
    slug,
    createdAt,
    ownerName,
    title,
  } = channel;

  const channelUrl = `/${workspaceSlug}/messages/${slug}`;
  const dateCreated = dateUtil(createdAt).monthDayYear();

  return (
    <Link role="listitem" className="ChannelsListModalItem" to={channelUrl}>
      <h3 className="ChannelsListModalItem__title">
        <FontAwesomeIcon icon="hashtag" className="ChannelsListModalItem__hashtag" size="xs" />
        {title}
      </h3>
      <div className="ChannelsListModalItem__body">
        <div className="ChannelsListModalItem__byline">
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

export default ChannelsListModalItem;
