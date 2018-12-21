import React, { Fragment } from 'react';
import MessagesListContainer from './MessagesListContainer';
import MessageForm from './MessageForm';

const MessageThreadDrawer = ({ messages, createMessageRequest }) => {
  const parentMessage = messages[0];
  const filterMenuItems = ['convo'];

  if (!parentMessage) {
    return null;
  }

  return (
    <Fragment>
      <MessagesListContainer
        messages={messages}
        role="listitem"
        filterMenuItems={filterMenuItems}
        isThreadHidden
        isHoverable
      />
      <MessageForm
        channelId={parentMessage.channelId}
        parentMessageId={parentMessage.id}
        parentMessageSlug={parentMessage.slug}
        createMessageRequest={createMessageRequest}
        hasSubmitButton
      />
    </Fragment>
  );
};

export default MessageThreadDrawer;
