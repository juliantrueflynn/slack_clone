import React from 'react';
import MessageEntries from './message_entries';

class MessagesPane extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadMessages();
  }

  render() {
    const { messages } = this.props;

    return (
      <div>
        <MessageEntries messages={ messages } />
      </div>
    );
  }
}

export default MessagesPane;