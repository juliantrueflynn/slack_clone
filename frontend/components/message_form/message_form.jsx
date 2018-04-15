import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
    };

    this.handleTextareaValueChange = this.handleTextareaValueChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleTextareaValueChange(event) {
    this.setState({
      body: event.currentTarget.value
    });
  }

  handleMessageSubmit(event) {
    event.preventDefault();
    this.props.createMessage(this.state);
  }

  render() {
    return (
      <form onSubmit={ this.handleMessageSubmit }>
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