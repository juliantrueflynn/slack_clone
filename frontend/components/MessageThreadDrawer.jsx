import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import Scrollable from './Scrollable';
import MessageContainer from './MessageContainer';

const MessageThreadDrawer = ({ messages, members, isLoading }) => {
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
          users={members}
          message={parentMessage}
          isThreadHidden
        />
      )}
      {isLoading || messages.map(message => (
        <MessageContainer
          key={message.slug}
          users={members}
          message={message}
          isThreadHidden
        />
      ))}
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
