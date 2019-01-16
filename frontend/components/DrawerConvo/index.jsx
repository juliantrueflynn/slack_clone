import React from 'react';
import MessagesListContainer from '../../containers/MessagesListContainer';
import MessageForm from '../MessageForm';
import ScrollBar from '../ScrollBar';
import withScrollManager from '../../hoc/withScrollManager';
import './styles.css';

const DrawerConvo = ({ messages, createMessageRequest, ...props }) => {
  const parentMessage = messages[0];

  if (!parentMessage) {
    return null;
  }

  return (
    <div className="DrawerConvo">
      <ScrollBar {...props}>
        <MessagesListContainer
          messages={messages}
          role="listitem"
          isThreadHidden
          isHoverable
        />
        <MessageForm
          chatroomId={parentMessage.chatroomId}
          parentMessageId={parentMessage.id}
          parentMessageSlug={parentMessage.slug}
          createMessageRequest={createMessageRequest}
          hasSubmitButton
        />
      </ScrollBar>
    </div>
  );
};

export default withScrollManager('Message')(DrawerConvo);
