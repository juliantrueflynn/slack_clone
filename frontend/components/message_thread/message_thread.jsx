import React from 'react';
import MessageThreadItem from './message_thread_item';
import MessageFormContainer from '../message_form/message_form_container';

const MessageThread = props => {
  return (
    <div className="message-thread">
      <div className="thread-message">
        <div>{ props.message.authorId }</div>
        <div>{ props.message.body }</div>
      </div>
      <div className="message-thread__entries">
        {props.threadEntries.map(entry =>
          <MessageThreadItem
            key={ entry.id }
            message={ entry }
            currentUserId={ props.currentUserId }
            editId={ props.editId }
            isEditing={ props.isEditing }
            openEditMessage={ props.openEditMessage }
            closeEditMessage={ props.closeEditMessage }
            editMessage={ props.editMessage }
            deleteMessage={ props.deleteMessage }
            deleteMessageSuccess={ props.deleteMessageSuccess }
          />
        )}
      </div>

      <MessageFormContainer parentMessageId={ props.message.id } />
    </div>
  );
};

export default MessageThread;