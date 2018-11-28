import React, { Fragment } from 'react';
import MessageFormContainer from './MessageFormContainer';
import MessagesList from './MessagesList';

const MessageThreadDrawer = ({ messages, users }) => {
  const parentMessage = messages[0];

  if (!parentMessage) {
    return null;
  }

  return (
    <Fragment>
      <MessagesList messages={messages} users={users} isThreadHidden />
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
