import React from 'react';
import MessagesListContainer from '../../containers/MessagesListContainer';
import MessageFormContainer from '../../containers/MessageFormContainer';
import ScrollBar from '../ScrollBar';
import withScrollManager from '../../hoc/withScrollManager';
import './styles.css';

const DrawerConvo = ({ messages, ...props }) => {
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
        <MessageFormContainer
          chatroomId={parentMessage.chatroomId}
          parentMessageId={parentMessage.id}
          parentMessageSlug={parentMessage.slug}
          hasSubmitButton
        />
      </ScrollBar>
    </div>
  );
};

export default withScrollManager('Message')(DrawerConvo);
