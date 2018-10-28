import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './SingleMessageThread.css';

const SingleMessageThread = ({
  thread,
  authors,
  lastMessageDate,
  users,
  slug,
  matchUrl,
  isThreadHidden,
}) => {
  if (isThreadHidden || !thread || !thread.length) {
    return null;
  }

  const threadUrl = `${matchUrl}/convo/${slug}`;
  const threadAuthors = authors.map(userSlug => users[userSlug]);
  let threadLength = thread.length;
  threadLength += threadLength === 1 ? ' reply' : ' replies';

  return (
    <div className="SingleMessageThread">
      <Link to={threadUrl} className="SingleMessageThread__link">
        <ul className="SingleMessageThread__items">
          <li className="SingleMessageThread__item SingleMessageThread__avatars">
            {threadAuthors.map(user => (
              <Avatar key={user.id} author={user} avatarFor="convo" size="24" />
            ))}
          </li>
          <li className="SingleMessageThread__item SingleMessageThread__counter">
            {threadLength}
          </li>
          <li className="SingleMessageThread__item SingleMessageThread__date">
            <time className="SingleMessage__date-text">
              {lastMessageDate}
            </time>
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default SingleMessageThread;
