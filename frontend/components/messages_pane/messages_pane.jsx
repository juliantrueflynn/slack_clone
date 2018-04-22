import React from 'react';
import MessageEntriesContainer
  from '../message_entries/message_entries_container';
import MessageFormContainer from '../message_form/message_form_container';
import { ActionCableProvider } from 'react-actioncable-provider';
import './messages_pane.css';

class MessagesPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="messages-pane">
        <ActionCableProvider url="ws://localhost:3000/cable">
          <MessageEntriesContainer />
          <MessageFormContainer />
          </ActionCableProvider>
      </div>
    );
  }
}

export default MessagesPane;