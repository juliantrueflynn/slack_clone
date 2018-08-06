import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Link } from 'react-router-dom';
import './MessageHoverMenu.css';
import Button from '../Button';

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
      <div className="Btn-group__msg-hover-menu">
        <Button className="Btn__reaction" onClick={this.handleEmojiToggle}>
          Add reaction
        </Button>
        {isEmojiOpen && (
          <EmojiPicker onEmojiClick={this.handleReactionClick} />
        )}
        {!parentMessageId && openThreadSlug !== slug && (
          <Link className="Btn__thread" to={`${baseThreadUrl}/thread/${slug}`}>
            Start a thread
          </Link>
        )}
        {!isFavorited && (
          <Button className="Btn__fav" onClick={this.handleFavClick}>
            Favorite
          </Button>
        )}
        {isFavorited && (
          <Button className="Btn__unfav" onClick={this.handleUnfavClick}>
            Unfavorite
          </Button>
        )}
        {isAuthor && (
          <Button className="Btn__msg-edit" onClick={this.handleEditClick}>
            Edit message
          </Button>
        )}
        {isAuthor && (
          <Button className="Btn__msg-delete" onClick={this.handleDeleteClick}>
            Delete message
          </Button>
        )}
      </div>
    );
  }
}

export default MessageHoverMenu;
