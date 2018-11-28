import React, { Fragment } from 'react';
import MessagesListContainer from './MessagesListContainer';
import MessageForm from './MessageForm';

const MessageThreadDrawer = ({ messages }) => {
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
        isEditable
        isHoverable
      />
      <MessageForm
        channelId={parentMessage.channelId}
        parentMessageId={parentMessage.id}
        parentMessageSlug={parentMessage.slug}
        hasSubmitButton
      />
    </Fragment>
  );
};

export default MessageThreadDrawer;
