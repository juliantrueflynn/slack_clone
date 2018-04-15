import React from 'react';
import MessageEntries from './message_entries';
import MessageFormContainer from '../message_form/message_form_container';

class MessagesPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;

    return (
      <div>
        <MessageEntries messages={ messages } />
        <MessageFormContainer />
      </div>
    );
  }
}

export default MessagesPane;