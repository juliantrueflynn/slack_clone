import React from 'react';
import { createSocket } from '../../util/websocket_util';
import Cable from 'actioncable';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      testOutput: []
    };

    this.handleTextareaValueChange = this.handleTextareaValueChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    this.createSocket();
  }

  handleTextareaValueChange(event) {
    this.setState({
      body: event.currentTarget.value
    });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    const newMessage = {
      body: this.state.body,
      author_id: this.props.authorId,
      channel_id: this.props.channelId,
      parent_message_id: null,
    };
    
    //this.props.createMessage(newMessage);
    this.chats.create(newMessage);
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
    
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => console.log('works!!'),
      received: (data) => {
        let itemsList = this.state.testOutput;
        itemsList.push(data.toString())
        this.setState({ testOutput: itemsList });
      },
      create: function(message) {
        this.perform('create', message);
      }
    });
  }

  render() {
    const testOutputList = this.state.testOutput.map(item => 
      <li>{item}</li>
    );
    return (
      <form onSubmit={ this.handleMessageSubmit }>
        <ul>{testOutputList}</ul>
        <div>
          <textarea
            onChange={ this.handleTextareaValueChange }
            value={ this.state.body } />
        </div>
        <input type="submit" value="Add Message" />
      </form>
    );
  }
}

export default MessageForm;