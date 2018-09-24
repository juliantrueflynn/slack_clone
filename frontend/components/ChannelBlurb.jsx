import React from 'react';
import { Link } from 'react-router-dom';
import './ChannelBlurb.css';

const ChannelBlurb = ({
  chatTitle,
  users,
  channel,
  isThreadHidden,
}) => {
  if (isThreadHidden || !channel) {
    return null;
  }

  const owner = users[channel.ownerSlug];
  const ownerUsername = owner && `@${owner.username}`;
  const ownerLink = owner && owner.slug;

  return (
    <section className="ChannelBlurb">
      <h2 className="ChannelBlurb__title">
        {chatTitle}
      </h2>
      <div className="ChannelBlurb__description">
        <Link to={ownerLink}>
          {ownerUsername}
        </Link>
        {` created this channel on ${channel.createdAt} this is the beginning of `}
        <strong>
          {chatTitle}
        </strong>
        {' channel.'}
      </div>
    </section>
  );
};

export default ChannelBlurb;
