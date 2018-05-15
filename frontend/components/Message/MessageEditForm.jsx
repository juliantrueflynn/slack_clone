import React from 'react';

class MessageEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { body: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.message.body !== prevState.body) {
      return { body: nextProps.message.body };
    }

    return null;
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const message = {
      slug: this.props.message.slug,
      body: this.state.body,
    };

    this.props.updateMessageRequest(message);
    this.props.toggleEditMessage(false);
  }

  handleCloseEdit(event) {
    event.preventDefault();
    this.props.toggleEditMessage(false);
  }

  render() {
    return (
      <form
        className="form form__message-edit"
        onSubmit={this.handleSubmit}
      >
        <div>
          <textarea
            value={this.state.body}
            onChange={this.handleInputValue('body')}
          />
        </div>
        <button onClick={this.handleCloseEdit}>Cancel</button>
        <input type="submit" value="Save changes" />
      </form>
    );
  }
}

export default MessageEditForm;