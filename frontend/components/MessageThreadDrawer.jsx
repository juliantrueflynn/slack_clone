import React, { Fragment } from 'react';
import MessageFormContainer from './MessageFormContainer';
import MessageContainer from './MessageContainer';
import MessagesList from './MessagesList';

const MessageThreadDrawer = ({ messages, users, isLoading }) => {
  const parentMessage = messages[0];

  if (!parentMessage) {
    return null;
  }

  return (
    <Fragment>
      {isLoading && (
        <MessageContainer
          key={parentMessage.slug}
          users={users}
          message={parentMessage}
          isThreadHidden
        />
      )}
      {isLoading || <MessagesList messages={messages} isThreadHidden />}
      <MessageFormContainer
        channelId={parentMessage.channelId}
        parentMessageId={parentMessage.id}
        parentMessageSlug={parentMessage.slug}
        hasSubmitButton
      />
    </Fragment>
  );
};

export default MessageThreadDrawer;
