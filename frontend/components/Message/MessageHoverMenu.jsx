import React from 'react';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleThreadOpenClick = this.handleThreadOpenClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleThreadOpenClick(event) {
    event.preventDefault();
    const sidebarProps = { messageSlug: this.props.message.slug };
    this.props.openRightSidebar(sidebarProps);
  }

  handleEditClick(event) {
    event.preventDefault();
    this.props.toggleEditMessage(true);
  }

  handleDeleteClick(event) {
    event.preventDefault();
    this.props.deleteMessageRequest(this.props.message.slug);
  }

  render() {
    const { message, isUserAuthor } = this.props;
  
    return (
      <div className="message-hover-menu">
        <ul className="message-hover-menu__buttons">
          {!message.parentMessageId && (
            <button onClick={this.handleThreadOpenClick}>Start thread</button>
          )}
          {isUserAuthor && (
            <button
              className="btn btn__message-edit"
              onClick={this.handleEditClick}
            >
              Edit message
            </button>
          )}
          {isUserAuthor && (
            <button
              className="btn btn__message-delete"
              onClick={this.handleDeleteClick}
            >
              Delete message
            </button>
          )}
        </ul>
      </div>
    );
  }
}

export default MessageHoverMenu;