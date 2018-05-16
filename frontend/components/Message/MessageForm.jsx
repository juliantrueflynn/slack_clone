import React from 'react';
import FormErrors from '../FormErrors';
 
class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: '' };

    this.handleTextareaValue = this.handleTextareaValue.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleTextareaValue(event) {
    const body = event.currentTarget.value;
    this.setState({ body });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    
    const { channelSlug, parentMessageId } = this.props;
    const message = {
      body: this.state.body, channelSlug, parentMessageId
    };
    
    this.props.createMessageRequest(message);
    this.setState({ body: '' });
  }

  render() {
    return (
      <div className="message-form-pane">
        <FormErrors entity="message" />

        <form onSubmit={this.handleMessageSubmit}>
          <textarea
            onChange={this.handleTextareaValue}
            value={this.state.body}
          />
          <input type="submit" value="Add Message" />
        </form>
      </div>
    );
  }
}

export default MessageForm;