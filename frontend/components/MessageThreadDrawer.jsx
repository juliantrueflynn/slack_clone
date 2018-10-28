import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import Scrollable from './Scrollable';
import MessageContainer from './MessageContainer';
import MessagesList from './MessagesList';

const MessageThreadDrawer = ({ messages, users, isLoading }) => {
  const parentMessage = messages[0];

  if (!parentMessage) {
    return null;
  }

  return (
    <Scrollable
      messages={messages}
      isMessageThread
      isAutoScroll
    >
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
    </Scrollable>
  );
};

export default MessageThreadDrawer;
