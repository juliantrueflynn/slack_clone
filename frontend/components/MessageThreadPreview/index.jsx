import React from 'react';
import { Link } from 'react-router-dom';
import { dateUtil } from '../../util/dateUtil';
import Avatar from '../Avatar';
import './styles.css';

const MessageThreadPreview = ({
  thread,
  slug,
  authors,
  lastMessageDate,
  usersMap,
  chatroomUrl,
  isThreadHidden,
}) => {
  if (!thread || !thread.length || isThreadHidden) {
    return null;
  }

  const convoUrl = `${chatroomUrl}/convo/${slug}`;
  const date = dateUtil(lastMessageDate);
  const month = date.monthName({ month: 'short' });
  const day = date.dayOrdinal();
  const lastDate = `Last reply ${month} ${day}`;

  const threadAuthors = authors.map(userSlug => usersMap[userSlug]);

  if (!authors.every(userSlug => userSlug === authors[0])) {
    threadAuthors.shift();
  }

  let threadLength = thread.length;
  threadLength += threadLength === 1 ? ' reply' : ' replies';

  return (
    <div className="MessageThreadPreview">
      <Link to={convoUrl} className="MessageThreadPreview__link">
        <ul className="MessageThreadPreview__items">
          <li className="MessageThreadPreview__item MessageThreadPreview__avatars">
            {threadAuthors.map(user => (
              <Avatar key={user.id} user={user} avatarFor="convo" size="24" />
            ))}
          </li>
          <li className="MessageThreadPreview__item MessageThreadPreview__counter">
            {threadLength}
          </li>
          <li className="MessageThreadPreview__item MessageThreadPreview__date">
            <time className="SingleMessage__date-text">{lastDate}</time>
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default MessageThreadPreview;
