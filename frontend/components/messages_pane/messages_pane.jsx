import React from 'react';
import MessageEntries from './message_entries';
import MessageFormContainer from '../message_form/message_form_container';
import { ActionCableProvider } from 'react-actioncable-provider';

class MessagesPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="pane pane__messages">
        <ActionCableProvider url="ws://localhost:3000/cable">
          <MessageEntries messages={ messages } />
          <MessageFormContainer />
          </ActionCableProvider>
      </div>
    );
  }
}

export default MessagesPane;