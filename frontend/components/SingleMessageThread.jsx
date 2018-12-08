import React from 'react';
import { Link } from 'react-router-dom';
import { dateUtil } from '../util/dateUtil';
import Avatar from './Avatar';
import './SingleMessageThread.css';

const SingleMessageThread = ({
  thread,
  slug,
  authors,
  lastMessageDate,
  users,
  url,
}) => {
  if (!thread || !thread.length) {
    return null;
  }

  const convoUrl = `${url}/convo/${slug}`;
  const date = dateUtil(lastMessageDate);
  const month = date.monthName({ month: 'short' });
  const day = date.dayOrdinal();
  const lastDate = `Last reply ${month} ${day}`;

  const threadAuthors = authors.map(userSlug => users[userSlug]);
  let threadLength = thread.length;
  threadLength += threadLength === 1 ? ' reply' : ' replies';

  return (
    <div className="SingleMessageThread">
      <Link to={convoUrl} className="SingleMessageThread__link">
        <ul className="SingleMessageThread__items">
          <li className="SingleMessageThread__item SingleMessageThread__avatars">
            {threadAuthors.map(user => (
              <Avatar key={user.id} user={user} avatarFor="convo" size="24" />
            ))}
          </li>
          <li className="SingleMessageThread__item SingleMessageThread__counter">
            {threadLength}
          </li>
          <li className="SingleMessageThread__item SingleMessageThread__date">
            <time className="SingleMessage__date-text">{lastDate}</time>
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default SingleMessageThread;
