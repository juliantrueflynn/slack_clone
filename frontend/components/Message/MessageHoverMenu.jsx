import React from 'react';
import { Link } from 'react-router-dom';
import JSEMOJI from 'emoji-js';
import EmojiPicker from 'emoji-picker-react';

const emojiOneImgPath = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
let jsemoji = new JSEMOJI();
jsemoji.img_set = 'emojione';
jsemoji.img_sets.emojione.path = emojiOneImgPath;
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = 'unified';

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
      emoji: emoji.name
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
    const { message, isAuthor, isFavorited, match: { params } } = this.props;
    const baseUrl = `/${params.workspaceSlug}/${params.channelSlug}`;
    
    return (
      <div className="message-hover-menu">
        <ul className="message-hover-menu__buttons">
          <button
            className="btn btn__reaction"
            onClick={this.handleEmojiToggle}
          >
            Add reaction
          </button>
          
          {this.state.isEmojiOpen && (
            <EmojiPicker onEmojiClick={this.handleReactionClick} />
          )}

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