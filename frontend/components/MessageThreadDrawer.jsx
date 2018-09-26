import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import MessagesPane from './MessagesPane';
import withDrawer from './withDrawer';
import './MessageThread.css';

const MessageThreadDrawer = ({
  match: { params: { messageSlug } },
  messages,
  members,
}) => {
  const message = messages[messageSlug];

  if (!message) {
    return null;
  }

  const childMessages = message.thread.reduce((acc, curr) => {
    acc.push(messages[curr]);
    return acc;
  }, [message]);

  return (
    <div className="MessageThread">
      <MessagesPane
        messages={childMessages}
        users={members}
        isThreadHidden
      />
      <MessageFormContainer
        channelId={message.channelId}
        parentMessageId={message.id}
        hasSubmitButton
      />
    </div>
  );
};

export default withDrawer('Thread')(MessageThreadDrawer);
