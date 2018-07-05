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

  handleReactionClick(id, emoji) {
    const reaction = {
      messageId: this.props.message.id,
      emoji: emoji.name,
    };

    this.props.createReactionRequest(reaction);
    this.setState({ isEmojiOpen: false });
  }

  handleEmojiToggle() {
    this.setState({ isEmojiOpen: !this.state.isEmojiOpen });
  }

  handleFavClick() {
    this.props.createFavoriteRequest(this.props.message.slug);
  }

  handleUnfavClick() {
    this.props.deleteFavoriteRequest(this.props.message.slug);
  }

  handleEditClick() {
    this.props.toggleEditMessage(true);
  }

  handleDeleteClick() {
    this.props.deleteMessageRequest(this.props.message.slug);
  }

  render() {
    const { isAuthor, isFavorited, ...props } = this.props;
    const { openThreadSlug, message: { slug, parentMessageId }, match: { params } } = props;
    const baseThreadUrl = `/${params.workspaceSlug}/${params.channelSlug}`;

    return (
      <div className="btn-group__msg-hover-menu">
        <button className="btn btn__reaction" onClick={this.handleEmojiToggle}>
          Add reaction
        </button>
        {this.state.isEmojiOpen && (
          <EmojiPicker onEmojiClick={this.handleReactionClick} />
        )}
        {!parentMessageId && openThreadSlug !== slug && (
          <Link role="button" className="btn btn__thread" to={`${baseThreadUrl}/thread/${slug}`}>
            Start a thread
          </Link>
        )}
        {!isAuthor && !isFavorited && (
          <button className="btn btn__fav" onClick={this.handleFavClick}>
            Favorite
          </button>
        )}
        {!isAuthor && isFavorited && (
          <button className="btn btn__unfav" onClick={this.handleUnfavClick}>
            Unfavorite
          </button>
        )}
        {isAuthor && (
          <button className="btn btn__msg-edit" onClick={this.handleEditClick}>
            Edit message
          </button>
        )}
        {isAuthor && (
          <button className="btn btn__msg-delete" onClick={this.handleDeleteClick}>
            Delete message
          </button>
        )}
      </div>
    );
  }
}

export default MessageHoverMenu;
