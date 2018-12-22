import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from '../util/dateUtil';
import './ModalChannelsListItem.css';

const ModalChannelsListItem = ({ channel, workspaceSlug }) => {
  const {
    slug,
    createdAt,
    ownerName,
    title,
  } = channel;

  const channelUrl = `/${workspaceSlug}/messages/${slug}`;
  const dateCreated = dateUtil(createdAt).monthDayYear();

  return (
    <Link role="listitem" className="ModalChannelsListItem" to={channelUrl}>
      <h3 className="ModalChannelsListItem__title">
        <FontAwesomeIcon icon="hashtag" className="ModalChannelsListItem__hashtag" size="xs" />
        {title}
      </h3>
      <div className="ModalChannelsListItem__body">
        <div className="ModalChannelsListItem__byline">
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

export default ModalChannelsListItem;
