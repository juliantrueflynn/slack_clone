import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './ChannelBlurb.css';

const ChannelBlurb = ({
  chatTitle,
  users,
  channel,
  isThreadHidden,
  match: { url },
}) => {
  if (isThreadHidden || !channel || channel.hasDm) {
    return null;
  }

  const owner = users[channel.ownerSlug];
  const ownerUsername = `@${owner.username}`;
  const ownerLink = `${url}/team/${channel.ownerSlug}`;

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

export default withRouter(ChannelBlurb);
