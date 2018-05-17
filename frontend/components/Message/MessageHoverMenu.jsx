import React from 'react';
import { Link } from 'react-router-dom';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleEditClick(event) {
    event.preventDefault();
    this.props.toggleEditMessage(true);
  }

  handleDeleteClick(event) {
    event.preventDefault();
    this.props.deleteMessageRequest(this.props.message.slug);
  }

  handleLinkClick() {
    // this.props.openRightSidebar({ messageSlug: this.props.message.slug });
  }

  render() {
    const { message, isUserAuthor, match } = this.props;
    return (
      <div className="message-hover-menu">
        <ul className="message-hover-menu__buttons">
          {!message.parentMessageId && (
            <Link
              to={`${match.url}/thread/${message.slug}`}
              onClick={this.handleLinkClick}
            >
              Start thread
            </Link>
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