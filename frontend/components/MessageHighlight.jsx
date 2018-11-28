import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MessageHighlight.css';

const MessageHighlight = ({
  pinId,
  pinsMap,
  isFavorited,
  users,
  currentUserId,
  matchUrl,
}) => {
  let pin;
  let user;
  let pinText;
  let favText;
  let faIcon = 'thumbtack';

  if (pinId) {
    pin = pinsMap[pinId];
    user = Object.assign({}, users[pin.userSlug]);

    if (currentUserId === user.id) {
      user.username = 'you';
    }

    pinText = `Pinned by ${user.username}`;
    favText = 'starred';
  }

  if (isFavorited && !pinId) {
    faIcon = ['fas', 'star'];
    favText = 'Added to your starred items';
  }

  const messageClassNames = classNames('MessageHighlight', {
    'MessageHighlight--pinned': pinId && !isFavorited,
    'MessageHighlight--faved': !pinId && isFavorited,
    'MessageHighlight--pin-fav': pinId && isFavorited
  });

  return (
    <div className={messageClassNames}>
      <div className="MessageHighlight__gutter">
        <FontAwesomeIcon icon={faIcon} size="sm" />
      </div>
      <div className="MessageHighlight__txt">
        <div className="MessageHighlight__txt-item">
          {pinText}
        </div>
        {isFavorited && (
          <div className="MessageHighlight__txt-item">
            <Link to={`${matchUrl}/favorites`}>
              {favText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHighlight;
