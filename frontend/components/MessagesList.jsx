import React from 'react';
import MessageContainer from './MessageContainer';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMessageId: -1,
      hoverMessageId: -1,
      isDdOpen: false,
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleDdToggle = this.handleDdToggle.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleEditToggle(messageId) {
    const { editMessageId } = this.state;

    if (editMessageId !== messageId) {
      this.setState({ editMessageId: messageId });
    }
  }

  handleHover(messageId) {
    const { isDdOpen, hoverMessageId } = this.state;

    if (!isDdOpen && hoverMessageId !== messageId) {
      this.setState({ hoverMessageId: messageId });
    }
  }

  handleDdToggle(eTarget, isDdOpen) {
    const nextState = { isDdOpen };

    if (eTarget) {
      nextState.hoverMessageId = -1;
    }

    this.setState(nextState);
  }

  render() {
    const { messages, children, ...props } = this.props;
    const { hoverMessageId, editMessageId } = this.state;

    if (!messages) {
      return null;
    }

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
