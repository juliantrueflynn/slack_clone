import React, { Fragment } from 'react';
import MessageFormContainer from './MessageFormContainer';
import withDrawer from './withDrawer';
import Scrollable from './Scrollable';
import MessageContainer from './MessageContainer';

const MessageThreadDrawer = ({ messages, members, currentUser }) => {
  const parentMessage = messages[0];

  if (!parentMessage) {
    return null;
  }

  const messagesLen = messages.length - 1;
  const lastEntry = messages[messagesLen];

  return (
    <Fragment>
      <Scrollable
        currentUserId={currentUser.id}
        lastEntry={lastEntry}
        messagesLen={messagesLen}
        isMessageThread
        isAutoScroll
      >
        {messages.map(message => (
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
          hasSubmitButton
        />
      </Scrollable>
    </Fragment>
  );
};

export default withDrawer('Thread')(MessageThreadDrawer);
