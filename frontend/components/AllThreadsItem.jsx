import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageThreadAuthors from './MessageThreadAuthors';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import './AllThreadsItem.css';

const AllThreadsItem = ({
  parentMessage,
  users,
  channels,
  currentUserSlug,
  match: { params: { workspaceSlug } },
}) => {
  if (!parentMessage.thread) {
    return null;
  }

  const channel = channels[parentMessage.channelSlug];
  const channelUrl = `/${workspaceSlug}/${parentMessage.channelSlug}`;

  return (
    <div className="AllThreadsItem">
      <header className="AllThreadsItem__header">
        <Link to={channelUrl} className="AllThreadsItem__title">
          <FontAwesomeIcon icon="hashtag" size="xs" className="AllThreadsItem__hashtag" />
          <div className="AllThreadsItem__title-text">
            {channel.title}
          </div>
        </Link>
        <MessageThreadAuthors
          authors={users}
          message={parentMessage}
          currentUserSlug={currentUserSlug}
        />
      </header>
      <div className="AllThreadsItem__body">
        <MessageContainer
          message={parentMessage}
          users={users}
          isThreadHidden
        />
        <div className="AllThreadsItem__list" role="list">
          {parentMessage.thread.map(child => (
            <MessageContainer
              key={child.id}
              message={child}
              users={users}
              isThreadHidden
            />
          ))}
        </div>
        <MessageFormContainer
          channelId={parentMessage.channelId}
          parentMessageId={parentMessage.id}
          parentMessageSlug={parentMessage.slug}
        />
      </div>
    </div>
  );
};

export default withRouter(AllThreadsItem);
