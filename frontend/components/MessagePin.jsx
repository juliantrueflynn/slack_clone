import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MessagePin.css';

const MessagePin = ({
  pinId,
  pins,
  users,
  currUserId,
}) => {
  const pin = pins[pinId];
  const user = pin && users[pin.userSlug];

  if (!pin || !user) {
    return null;
  }

  let { username } = user;
  if (currUserId === user.id) {
    username = 'you';
  }

  return (
    <div className="MessagePin">
      <div className="MessagePin__gutter">
        <FontAwesomeIcon icon="thumbtack" size="xs" />
      </div>
      {`Pinned by ${username}`}
    </div>
  );
};

export default MessagePin;
