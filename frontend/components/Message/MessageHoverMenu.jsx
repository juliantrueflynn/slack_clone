import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from '../Button';
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

    if (!props.isMouseOver || props.isEditing) return null;

    return (
      <div className="Btn-group__msg-hover-menu">
        <Button buttonFor="reaction" onClick={this.handleEmojiToggle}>
          <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />
        </Button>
        {isEmojiOpen && (
          <EmojiPicker onEmojiClick={this.handleReactionClick} />
        )}
        {!parentMessageId && openThreadSlug !== slug && (
          <Link className="Btn Btn__thread" to={`${baseThreadUrl}/thread/${slug}`}>
            <FontAwesomeIcon icon={['far', 'comment']} fixedWidth />
          </Link>
        )}
        {!isFavorited && (
          <Button buttonFor="fav Btn__fav--empty" onClick={this.handleFavClick}>
            <FontAwesomeIcon icon={['far', 'star']} fixedWidth />
          </Button>
        )}
        {isFavorited && (
          <Button buttonFor="fav Btn__fav--filled" onClick={this.handleUnfavClick}>
            <FontAwesomeIcon icon={['fas', 'star']} fixedWidth />
          </Button>
        )}
        {isAuthor && (
          <Button buttonFor="msg-edit" onClick={this.handleEditClick}>
            <FontAwesomeIcon icon={['far', 'edit']} fixedWidth />
          </Button>
        )}
        {isAuthor && (
          <Button buttonFor="msg-delete" onClick={this.handleDeleteClick}>
            <FontAwesomeIcon icon={['far', 'trash-alt']} fixedWidth />
          </Button>
        )}
      </div>
    );
  }
}

export default MessageHoverMenu;
