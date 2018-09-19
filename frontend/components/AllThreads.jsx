import React from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import MessageThreadAuthors from './MessageThreadAuthors';

const AllThreads = ({
  chatPath,
  messages,
  users,
  channels,
  currentUser,
}) => {
  if (chatPath !== 'threads') {
    return null;
  }

  const parentMessages = Object.values(messages);

  return (
    parentMessages.map(parent => (
      <div key={parent.slug} className="AllThread__item">
        <div className="AllThreads__meta">
          <strong>
            {channels[parent.channelSlug].title}
          </strong>
          <MessageThreadAuthors
            messages={messages}
            authors={users}
            messageThread={parent.thread}
            currentUserSlug={currentUser.slug}
          />
        </div>
        <MessageContainer message={parent} />
        <div className="ThreadsList" role="list">
          {parent.thread && parent.thread.map(childSlug => (
            <MessageContainer key={childSlug} message={messages[childSlug]} />
          ))}
        </div>
        {/* <MessageFormContainer parentMessageId={parent.id} channelId={parent.channelId} /> */}
      </div>
    ))
  );
};

export default AllThreads;
