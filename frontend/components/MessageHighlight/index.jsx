import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

const MessageHighlight = ({
  pinId,
  pinsMap,
  isFavorited,
  usersMap,
  currentUserSlug,
  chatroomUrl,
}) => {
  let pin;
  let user;
  let pinText;
  let favText;
  let faIcon = 'thumbtack';

  if (pinId) {
    pin = pinsMap[pinId];
    user = usersMap[pin.userSlug];

    if (currentUserSlug === user.slug) {
      user.username = 'you';
    }

    pinText = `Pinned by ${user.username}`;
    favText = 'starred';
  }

  if (isFavorited && !pinId) {
    faIcon = 'star';
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
            <Link to={`${chatroomUrl}/favorites`}>
              {favText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHighlight;
