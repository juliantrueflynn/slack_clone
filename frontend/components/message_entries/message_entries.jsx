import React from 'react';
import MessageEntry from './message_entry';

class MessageEntries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      messages,
      editMessage,
      openEditMessage,
      isEditing,
      editId,
      closeEditMessage,
      deleteMessage,
      deleteMessageSuccess,
    } = this.props;
    
    return (
      <div>
        {messages.map(message =>
          <MessageEntry
            message={ message }
            openEditMessage={ openEditMessage }
            editMessage={ editMessage }
            isEditing={ isEditing }
            editId={ editId }
            closeEditMessage={ closeEditMessage }
            deleteMessage={ deleteMessage }
            deleteMessageSuccess={ deleteMessageSuccess }
            key={ message.id }
          />
        )}
      </div>
    );
  }
}

export default MessageEntries;