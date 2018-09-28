import React, { Fragment } from 'react';
import MessageFormContainer from './MessageFormContainer';
import MessagesPane from './MessagesPane';
import withDrawer from './withDrawer';

const MessageThreadDrawer = ({ messages, members }) => {
  const message = messages[0];

  if (!message) {
    return null;
  }

  return (
    <Fragment>
      <MessagesPane
        messages={messages}
        users={members}
        isThreadHidden
      />
      <MessageFormContainer
        channelId={message.channelId}
        parentMessageId={message.id}
        hasSubmitButton
      />
    </Fragment>
  );
};

export default withDrawer('Thread')(MessageThreadDrawer);
