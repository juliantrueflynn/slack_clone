import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmojiToggle = this.handleEmojiToggle.bind(this);
    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleUnfavClick = this.handleUnfavClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleEmojiToggle(e) {
    const { modalOpen, message: { id: messageId } } = this.props;

    const menuNode = e.currentTarget.parentNode;
    const nodeBounds = menuNode.getBoundingClientRect();
    const modalProps = {
      clickPosY: nodeBounds.top,
      clickPosX: nodeBounds.right,
      messageId,
    };

    modalOpen('MODAL_REACTION', modalProps);
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
    const {
      isEditing,
      match: { url },
      message,
      currentUser,
    } = this.props;

    if (isEditing) {
      return null;
    }

    const isAuthor = currentUser.id === message.authorId;
    const isMessageType = message.entityType === 'entry';
    return (
      <div className="MessageHoverMenu">
        <Button unStyled buttonFor="reaction" onClick={this.handleEmojiToggle}>
          <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />
        </Button>
        {(!message.parentMessageId && isMessageType) && (
          <Button className="Btn Btn__thread" linkTo={`${url}/thread/${message.slug}`}>
            <FontAwesomeIcon icon={['far', 'comment']} fixedWidth />
          </Button>
        )}
        {(!message.favoriteId && isMessageType) && (
          <Button unStyled buttonFor="fav Btn__fav--empty" onClick={this.handleFavClick}>
            <FontAwesomeIcon icon={['far', 'star']} fixedWidth />
          </Button>
        )}
        {(message.favoriteId && isMessageType) && (
          <Button unStyled buttonFor="fav Btn__fav--filled" onClick={this.handleUnfavClick}>
            <FontAwesomeIcon icon={['fas', 'star']} fixedWidth />
          </Button>
        )}
        {(isAuthor && isMessageType) && (
          <Button unStyled buttonFor="msg-edit" onClick={this.handleEditClick}>
            <FontAwesomeIcon icon={['far', 'edit']} fixedWidth />
          </Button>
        )}
        {(isAuthor && isMessageType) && (
          <Button unStyled buttonFor="msg-delete" onClick={this.handleDeleteClick}>
            <FontAwesomeIcon icon={['far', 'trash-alt']} fixedWidth />
          </Button>
        )}
      </div>
    );
  }
}

export default withRouter(MessageHoverMenu);
