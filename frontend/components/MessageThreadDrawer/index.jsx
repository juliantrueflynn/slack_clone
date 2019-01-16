import React from 'react';
import MessagesListContainer from '../../containers/MessagesListContainer';
import MessageForm from '../MessageForm';
import ScrollBar from '../ScrollBar';
import withScrollManager from '../../hoc/withScrollManager';
import './styles.css';

const MessageThreadDrawer = ({ messages, createMessageRequest, ...props }) => {
  const parentMessage = messages[0];
  const filterMenuItems = ['convo'];

  if (!parentMessage) {
    return null;
  }

  return (
    <div className="MessageThreadDrawer">
      <ScrollBar {...props}>
        <MessagesListContainer
          messages={messages}
          role="listitem"
          filterMenuItems={filterMenuItems}
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

export default withScrollManager('Message')(MessageThreadDrawer);
