import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: "" };

    this.handleTextareaValue = this.handleTextareaValue.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleMessageSuccess = this.handleMessageSuccess.bind(this);
  }

  handleTextareaValue(event) {
    const body = event.currentTarget.value;
    this.setState({ body });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    
    const newMessage = {
      body: this.state.body,
      author_id: this.props.authorId,
      channel_id: this.props.channelId,
      parent_message_id: null,
    };

    this.refs.roomChannel.perform('create', newMessage);
  }

  handleMessageSuccess(message) {
    this.props.createMessage(message);
    this.setState({ body: "" });
  }

  render() {
    const { body } = this.state;

    return (
      <div>
        <ActionCable
          ref="roomChannel"
          channel={{ channel: 'ChatChannel' }}
          onReceived={this.handleMessageSuccess}
        />
        <form onSubmit={ this.handleMessageSubmit }>
          <div>
            <textarea onChange={ this.handleTextareaValue } value={ body } />
          </div>
          <input type="submit" value="Add Message" />
        </form>
      </div>
    );
  }
}

export default MessageForm;