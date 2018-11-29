import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageThreadAuthors from './MessageThreadAuthors';
import MessagesListContainer from './MessagesListContainer';
import MessageForm from './MessageForm';
import './AllThreadsItem.css';

const AllThreadsItem = ({
  parentMessage,
  users,
  channels,
  currentUserSlug,
  workspaceSlug,
}) => {
  if (!parentMessage.thread) {
    return null;
  }

  const channel = channels[parentMessage.channelSlug];
  const channelUrl = `/${workspaceSlug}/${parentMessage.channelSlug}`;
  const threadMessages = parentMessage.thread.reduce((acc, curr) => {
    acc.push(curr);
    return acc;
  }, [parentMessage]);

  return (
    <div className="AllThreadsItem" role="listitem">
      <header className="AllThreadsItem__header">
        <Link to={channelUrl} className="AllThreadsItem__title">
          <FontAwesomeIcon icon="hashtag" size="xs" className="AllThreadsItem__hashtag" />
          <div className="AllThreadsItem__title-text">
            {channel.title}
          </div>
        </Link>
        <MessageThreadAuthors
          parentAuthorSlug={parentMessage.authorSlug}
          authors={parentMessage.authors}
          users={users}
          currentUserSlug={currentUserSlug}
        />
      </header>
      <div className="AllThreadsItem__body">
        <div className="AllThreadsItem__list" role="list">
          <MessagesListContainer
            messages={threadMessages}
            role="listitem"
            isThreadHidden
            isHoverable
            isEditable
          />
        </div>
        <MessageForm
          channelId={parentMessage.channelId}
          parentMessageId={parentMessage.id}
          parentMessageSlug={parentMessage.slug}
        />
      </div>
    </div>
  );
};

export default AllThreadsItem;
