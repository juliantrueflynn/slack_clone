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

  return (
    <Fragment>
      <Scrollable
        currentUserId={currentUser.id}
        messages={messages}
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
