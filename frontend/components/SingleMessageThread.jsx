import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './SingleMessageThread.css';

const SingleMessageThread = ({
  threadMessages,
  users,
  messageSlug,
  matchUrl,
}) => {
  const threadUrl = `${matchUrl}/thread/${messageSlug}`;
  const allAuthors = threadMessages.map(msg => users[msg.authorSlug]);
  const authors = allAuthors.filter((user, i, self) => self.indexOf(user) === i);
  const lastMessageDate = threadMessages.slice(-1).createdAt;
  let threadLength = threadMessages.length;
  threadLength += threadLength === 1 ? ' reply' : ' replies';

  return (
    <div className="SingleMessageThread">
      <Link to={threadUrl} className="SingleMessageThread__link">
        <ul className="SingleMessageThread__items">
          <li className="SingleMessageThread__item SingleMessageThread__avatars">
            {authors.map(user => (
              <Avatar key={user.id} author={user} avatarFor="thread" size="24" />
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
