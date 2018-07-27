import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Link } from 'react-router-dom';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEmojiOpen: false };
    this.handleReactionClick = this.handleReactionClick.bind(this);
    this.handleEmojiToggle = this.handleEmojiToggle.bind(this);
    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleUnfavClick = this.handleUnfavClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleReactionClick(_, emoji) {
    const { message: { id: messageId }, createReactionRequest } = this.props;
    const reaction = { messageId, emoji: emoji.name };

    createReactionRequest(reaction);
    this.setState({ isEmojiOpen: false });
  }

  handleEmojiToggle() {
    const { isEmojiOpen } = this.state;
    this.setState({ isEmojiOpen: !isEmojiOpen });
  }

  handleFavClick() {
    const { createFavoriteRequest, message: { id: messageId } } = this.props;
    createFavoriteRequest({ messageId });
  }

  handleUnfavClick() {
    const { message: { favoriteId }, deleteFavoriteRequest } = this.props;
    deleteFavoriteRequest(favoriteId);
  }

  handleEditClick() {
    const { handleEditToggle } = this.props;
    handleEditToggle(true);
  }

  handleDeleteClick() {
    const { deleteMessageRequest, message: { slug } } = this.props;
    deleteMessageRequest(slug);
  }

  render() {
    const { isAuthor, isFavorited, ...props } = this.props;
    const { isEmojiOpen } = this.state;
    const { openThreadSlug, message: { slug, parentMessageId }, match: { params } } = props;
    const baseThreadUrl = `/${params.workspaceSlug}/${params.channelSlug}`;

    if (!props.isMouseOver || props.isEditing) {
      return null;
    }

    return (
      <div className="btn-group__msg-hover-menu">
        <button type="button" className="btn btn__reaction" onClick={this.handleEmojiToggle}>
          Add reaction
        </button>
        {isEmojiOpen && (
          <EmojiPicker onEmojiClick={this.handleReactionClick} />
        )}
        {!parentMessageId && openThreadSlug !== slug && (
          <Link role="button" className="btn btn__thread" to={`${baseThreadUrl}/thread/${slug}`}>
            Start a thread
          </Link>
        )}
        {!isFavorited && (
          <button type="button" className="btn btn__fav" onClick={this.handleFavClick}>
            Favorite
          </button>
        )}
        {isFavorited && (
          <button type="button" className="btn btn__unfav" onClick={this.handleUnfavClick}>
            Unfavorite
          </button>
        )}
        {isAuthor && (
          <button type="button" className="btn btn__msg-edit" onClick={this.handleEditClick}>
            Edit message
          </button>
        )}
        {isAuthor && (
          <button type="button" className="btn btn__msg-delete" onClick={this.handleDeleteClick}>
            Delete message
          </button>
        )}
      </div>
    );
  }
}

export default MessageHoverMenu;
