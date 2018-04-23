import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class ThreadForm extends React.Component {
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

    const { thread } = this.props;
    
    const newMessage = {
      body: this.state.body,
      author_id: thread.authorId,
      channel_id: thread.channelId,
      parent_message_id: thread.id,
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
          onReceived={ this.handleMessageSuccess }
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

export default ThreadForm;