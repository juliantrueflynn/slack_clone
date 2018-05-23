import React from 'react';
import { Link } from 'react-router-dom';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleUnfavClick = this.handleUnfavClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleFavClick(event) {
    event.preventDefault();
    this.props.createFavoriteRequest(this.props.message.slug);
  }

  handleUnfavClick(event) {
    event.preventDefault();
    this.props.deleteFavoriteRequest(this.props.message.slug);
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
    const { message, isAuthor, isFavorited, match: { params } } = this.props;
    const baseUrl = `/${params.workspaceSlug}/${params.channelSlug}`;
    
    return (
      <div className="message-hover-menu">
        <ul className="message-hover-menu__buttons">
          {!message.parentMessageId && (
            <Link to={`${baseUrl}/thread/${message.slug}`}>
              Start thread
            </Link>
          )}
          {!isAuthor && !isFavorited && (
            <button
              className="btn btn__fav"
              onClick={this.handleFavClick}
            >
              Favorite
            </button>
          )}
          {!isAuthor && isFavorited && (
            <button
              className="btn btn__unfav"
              onClick={this.handleUnfavClick}
            >
              Unfavorite
            </button>
          )}
          {isAuthor && (
            <button
              className="btn btn__message-edit"
              onClick={this.handleEditClick}
            >
              Edit message
            </button>
          )}
          {isAuthor && (
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