import React from 'react';
import { Link } from 'react-router-dom';
import './ChannelBlurb.css';

const ChannelBlurb = ({
  chatTitle,
  owner,
  createdAt,
  purpose,
}) => {
  const ownerUsername = owner && `@${owner.username}`;
  const ownerLink = owner && owner.slug;
  const chatPurpose = purpose && 'Purpose';

  return (
    <section className="ChannelBlurb">
      <h2 className="ChannelBlurb__title">
        {chatTitle}
      </h2>
      <div className="ChannelBlurb__description">
        {owner && (
          <Link to={ownerLink}>
            {ownerUsername}
          </Link>
        )}
        &nbsp;
        created this channel on
        &nbsp;
        {createdAt}
        &nbsp;
        this is the beginning of
        &nbsp;
        <strong>
          {chatTitle}
        </strong>
        &nbsp;
        channel.
        &nbsp;
        {chatPurpose}
      </div>
    </section>
  );
};

export default ChannelBlurb;
