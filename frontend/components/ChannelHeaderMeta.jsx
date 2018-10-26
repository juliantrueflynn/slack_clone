import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChannelEditorModal from './ChannelEditorModal';
import Button from './Button';
import './ChannelHeaderMeta.css';

const ChannelHeaderMeta = ({
  currentUser,
  channel,
  modalOpen,
  accordionOpen,
  match: { url },
}) => {
  const subsLen = channel && channel.members.length;
  const hasTopic = !!(channel && channel.topic);
  const openMembers = () => accordionOpen();

  return (
    <div className="ChannelHeaderMeta">
      {channel && (
        <div className="ChannelHeaderMeta__item">
          <Link to={`${url}/details`} onClick={openMembers}>
            <FontAwesomeIcon icon={['far', 'user']} size="sm" />
            {subsLen}
          </Link>
        </div>
      )}
      {channel && (
        <div className="ChannelHeaderMeta__item ChannelHeaderMeta__item-topic">
          <Button onClick={modalOpen} buttonFor="edit-topic" unStyled>
            {channel.topic}
            {hasTopic || <FontAwesomeIcon icon={['far', 'edit']} size="sm" />}
            {hasTopic || 'Add topic'}
          </Button>
        </div>
      )}
      {channel && (
        <ChannelEditorModal currentUser={currentUser} channel={channel} />
      )}
    </div>
  );
};

export default withRouter(ChannelHeaderMeta);
