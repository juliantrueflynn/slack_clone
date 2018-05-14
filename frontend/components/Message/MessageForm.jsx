import React from 'react';
 
class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: "" };

    this.handleTextareaValue = this.handleTextareaValue.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleTextareaValue(event) {
    const body = event.currentTarget.value;
    this.setState({ body });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    
    const { channelSlug, parentMessageSlug } = this.props;
    const message = {
      body: this.state.body, channelSlug, parentMessageSlug
    };
    
    this.props.createMessage(message);
    this.setState({ body: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleMessageSubmit}>
        <div>
          <textarea
            onChange={this.handleTextareaValue}
            value={this.state.body}
          />
        </div>
        <input type="submit" value="Add Message" />
      </form>
    );
  }
}

export default MessageForm;