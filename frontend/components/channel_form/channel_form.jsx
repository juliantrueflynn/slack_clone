import React from 'react';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputValue(property) {
    return event => this.setState({ [property]: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const channel = {
      title: this.state.title,
      ownerId: this.props.currentUserId,
      workspaceId: this.props.workspaceId,
    };
    this.props.createChannel(channel);
  }

  render() {
    return (
      <div>
        <h1>Create New Channel</h1>

        <form onSubmit={ this.handleFormSubmit }>
          <div>
            <label>Channel Title</label>
            <input
              type="text"
              placeholder="Title"
              value={ this.state.title }
              onChange={ this.handleInputValue('title') } />
          </div>
          <input type="submit" value="Create Channel" />
        </form>
      </div>
    );
  }
}

export default ChannelForm;