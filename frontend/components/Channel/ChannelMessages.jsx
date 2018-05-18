import React from 'react';
import MessageContainer from '../Message/MessageContainer';

class MessageEntries extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;

    return (
      <div>
        {messages && messages.map(message =>
          <MessageContainer message={message} key={message.slug} />
        )}
      </div>
    );
  }
}

export default MessageEntries;