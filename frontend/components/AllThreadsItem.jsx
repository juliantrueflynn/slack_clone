import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageThreadAuthors from './MessageThreadAuthors';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import './AllThreadsItem.css';

const AllThreadsItem = ({
  parentMessage,
  messages,
  users,
  channels,
  currentUserSlug,
  match: { params: { workspaceSlug } },
}) => {
  const channel = channels[parentMessage.channelSlug];

  if (!parentMessage.thread || !channel) {
    return null;
  }

  const messageThread = parentMessage.thread.reduce((acc, curr) => {
    acc.push(messages[curr]);
    return acc;
  }, [parentMessage]);
  const channelUrl = `/${workspaceSlug}/${channel.slug}`;
  const childAuthor = message => users[message.authorSlug];

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
          messageThread={messageThread}
          currentUserSlug={currentUserSlug}
        />
      </header>
      <div className="AllThreadsItem__body">
        <MessageContainer
          author={users[parentMessage.authorSlug]}
          message={parentMessage}
          isThreadHidden
        />
        <div className="AllThreadsItem__list" role="list">
          {messageThread.slice(1).map(child => (
            <MessageContainer
              key={child.id}
              message={child}
              author={childAuthor(child)}
              isThreadHidden
            />
          ))}
        </div>
        <MessageFormContainer
          parentMessageId={parentMessage.id}
          channelId={parentMessage.channelId}
        />
      </div>
    </div>
  );
};

export default withRouter(AllThreadsItem);
