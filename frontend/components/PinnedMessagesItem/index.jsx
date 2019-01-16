import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from '../Message';
import Button from '../Button';
import './styles.css';

const PinnedMessagesItem = ({
  message,
  currentUserSlug,
  url,
  destroyPinRequest,
}) => (
  <div role="listitem" className="PinnedMessagesItem">
    <div className="PinnedMessagesItem__container">
      <Button buttonFor="destroy" onClick={() => destroyPinRequest(message.pinId)} unStyled>
        <FontAwesomeIcon icon="times" />
      </Button>
      <Message
        message={message}
        currentUserSlug={currentUserSlug}
        url={url}
        shouldHideEngagement
      />
    </div>
  </div>
);

export default PinnedMessagesItem;
