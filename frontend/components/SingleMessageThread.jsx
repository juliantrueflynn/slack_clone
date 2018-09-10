import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './SingleMessageThread.css';

const SingleMessageThread = ({
  threadLastUpdate,
  threadUsers,
  message,
  isInSidebar,
  match: { params: { channelSlug, workspaceSlug } }
}) => {
  const { parentMessageId, thread } = message;

  if (isInSidebar || !message || parentMessageId || !thread || !thread.length) {
    return null;
  }

  const threadUrl = `/${workspaceSlug}/messages/${channelSlug}/thread/${message.slug}`;
  let threadLength = thread.length;
  threadLength += threadLength === 1 ? ' reply' : ' replies';
  let users = threadUsers;
  if (threadUsers.length !== thread.length) {
    users = threadUsers.slice(1);
  }

  return (
    <div className="SingleMessageThread">
      <Link to={threadUrl} className="SingleMessageThread__link">
        <ul className="SingleMessageThread__items">
          <li className="SingleMessageThread__item SingleMessageThread__avatars">
            {users.map(user => (
              <Avatar key={user.id} author={user} avatarFor="thread" size="24" />
            ))}
          </li>
          <li className="SingleMessageThread__item SingleMessageThread__counter">
            {threadLength}
          </li>
          <li className="SingleMessageThread__item SingleMessageThread__date">
            <time className="SingleMessage__date-text">
              {threadLastUpdate}
            </time>
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default SingleMessageThread;
