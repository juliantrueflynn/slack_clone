import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatusIcon from './StatusIcon';
import Button from './Button';
import './ChannelHeaderMeta.css';

const ChannelHeaderMeta = ({
  channel,
  modalOpen,
  accordionOpen,
  users,
  match: { url },
}) => {
  if (!channel) {
    return null;
  }

  if (channel.hasDm) {
    const user = users[channel.dmUserSlug];
    const userStatus = user && user.status;
    const email = user && user.email;

    return (
      <div className="ChannelHeaderMeta">
        <div className="ChannelHeaderMeta__item">
          <StatusIcon member={user} />
          {userStatus}
        </div>
        <div className="ChannelHeaderMeta__item">
          {email}
        </div>
      </div>
    );
  }

  const subsLen = channel && channel.members.length;
  const hasTopic = !!(channel && channel.topic);
  const openMembers = () => accordionOpen();

  return (
    <div className="ChannelHeaderMeta">
      <div className="ChannelHeaderMeta__item">
        <Link to={`${url}/details`} onClick={openMembers}>
          <FontAwesomeIcon icon={['far', 'user']} size="sm" />
          {subsLen}
        </Link>
      </div>
      <div className="ChannelHeaderMeta__item ChannelHeaderMeta__item-topic">
        <Button onClick={modalOpen} buttonFor="edit-topic" unStyled>
          {channel.topic}
          {hasTopic || <FontAwesomeIcon icon={['far', 'edit']} size="sm" />}
          {hasTopic || 'Add topic'}
        </Button>
      </div>
    </div>
  );
};

export default withRouter(ChannelHeaderMeta);
