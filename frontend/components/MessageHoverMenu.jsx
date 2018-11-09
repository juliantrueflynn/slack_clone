import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from './Dropdown';
import Button from './Button';
import './MessageHoverMenu.css';
import Menu from './Menu';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleReactionToggle = this.handleReactionToggle.bind(this);
    this.handleFavToggle = this.handleFavToggle.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleReactionToggle(e) {
    const { modalOpen, id: messageId } = this.props;

    const menuNode = e.currentTarget.parentNode;
    const nodeBounds = menuNode.getBoundingClientRect();
    const modalProps = {
      clickPosY: nodeBounds.top,
      clickPosX: nodeBounds.right,
      messageId,
    };

    modalOpen('MODAL_REACTION', modalProps);
  }

  handleFavToggle() {
    const {
      id,
      favoriteId,
      createFavoriteRequest,
      deleteFavoriteRequest,
    } = this.props;

    if (favoriteId) {
      deleteFavoriteRequest(favoriteId);
    } else {
      createFavoriteRequest(id);
    }
  }

  handleOverlayClick(e) {
    const { ddToggle } = this.props;
    ddToggle(e.target, false);
  }

  render() {
    const {
      handleEditToggle,
      id,
      slug,
      favoriteId,
      parentMessageId,
      entityType,
      authorId,
      pinId,
      currentUser,
      createPinRequest,
      destroyPinRequest,
      ddToggle,
      deleteMessageRequest,
      match: { url },
    } = this.props;

    const isAuthor = currentUser.id === authorId;
    const isMessageType = entityType === 'entry';
    const ddItems = [];

    if (pinId) {
      const onClick = () => destroyPinRequest(pinId);
      ddItems.push({ label: 'Un-pin message', onClick });
    } else {
      const onClick = () => createPinRequest({ messageId: id });
      ddItems.push({ label: 'Pin message', onClick });
    }

    if (isAuthor) {
      ddItems.push({ label: 'Edit message', onClick: () => handleEditToggle(id) });
      ddItems.push({ label: 'Delete message', onClick: () => deleteMessageRequest(slug) });
    }

    const favIcon = favoriteId ? ['fas', 'star'] : ['far', 'star'];
    const favClassName = favoriteId ? 'fav-solid' : 'fav-empty';

    const menuItems = [{
      key: 'reaction',
      onClick: this.handleReactionToggle,
      icon: <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />,
    }];

    if (isMessageType) {
      if (!parentMessageId) {
        menuItems.push({
          key: 'convo',
          link: `${url}/convo/${slug}`,
          icon: <FontAwesomeIcon icon={['far', 'comment']} fixedWidth />,
        });
      }

      menuItems.push({
        key: 'favorite',
        icon: <FontAwesomeIcon icon={favIcon} fixedWidth />,
        onClick: this.handleFavToggle,
        modifierClassName: favClassName,
      });
    }

    return (
      <div className="MessageHoverMenu">
        <Menu menuFor="message" items={menuItems} isRow unStyled />
        {isMessageType && (
          <Dropdown
            items={ddItems}
            menuPos="right"
            ddToggle={ddToggle}
            onOverlayClick={this.handleOverlayClick}
            shouldPos
          >
            <FontAwesomeIcon icon="ellipsis-h" fixedWidth />
          </Dropdown>
        )}
      </div>
    );
  }
}

export default withRouter(MessageHoverMenu);
