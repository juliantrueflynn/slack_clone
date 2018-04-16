import React from 'react';
import MessageEntry from './message_entry';

class MessageEntries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;

    return (
      <div>
        {messages.map(message =>
          <MessageEntry message={ message } key={ message.id }  />
        )}
      </div>
    );
  }
}

export default MessageEntries;