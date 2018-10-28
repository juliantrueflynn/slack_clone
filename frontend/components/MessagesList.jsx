import React from 'react';
import MessageContainer from './MessageContainer';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMessageId: -1, hoverMessageId: -1, isDdOpen: false };
    this.handleHover = this.handleHover.bind(this);
    this.handleDdToggle = this.handleDdToggle.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleEditToggle(editMessageId) {
    this.setState({ editMessageId });
  }

  handleHover(hoverMessageId) {
    const { isDdOpen } = this.state;

    if (!isDdOpen) {
      this.setState({ hoverMessageId });
    }
  }

  handleDdToggle(isDdOpen) {
    this.setState({ isDdOpen });
  }

  render() {
    const { messages, children, ...props } = this.props;
    const { hoverMessageId, editMessageId } = this.state;

    return messages.map(message => (
      <MessageContainer
        key={message.id}
        message={message}
        hoverMessageId={hoverMessageId}
        editMessageId={editMessageId}
        handleHover={this.handleHover}
        handleEditToggle={this.handleEditToggle}
        ddToggle={this.handleDdToggle}
        {...props}
      />
    ));
  }
}

export default MessagesList;
