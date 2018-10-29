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

  handleDdToggle(nextState) {
    const { isDdOpen } = this.state;

    if (isDdOpen !== nextState) {
      this.setState({ isDdOpen: nextState });
    }
  }

  render() {
    const { messages, children, ...props } = this.props;
    const { hoverMessageId, editMessageId } = this.state;

    if (!messages) {
      return null;
    }

    return (
      <div className="MessagesList" ref={this.list}>
        {messages.map(message => (
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
        ))}
      </div>
    );
  }
}

export default MessagesList;
