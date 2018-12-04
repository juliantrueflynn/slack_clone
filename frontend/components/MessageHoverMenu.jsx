import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  static getModalBoundingClientRect(e) {
    const menuNode = e.currentTarget.parentElement.parentElement;
    return menuNode.getBoundingClientRect();
  }

  constructor(props) {
    super(props);
    this.handleReactionToggle = this.handleReactionToggle.bind(this);
    this.handleFavToggle = this.handleFavToggle.bind(this);
    this.handleDropdownModal = this.handleDropdownModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { hasHover, isDdOpen, handleHover } = this.props;

    if (hasHover && !isDdOpen && prevProps.isDdOpen) {
      handleHover(false);
    }
  }

  handleReactionToggle(e) {
    const { modalOpen, message: { slug: messageSlug } } = this.props;

    const nodeBounds = MessageHoverMenu.getModalBoundingClientRect(e);
    const modalProps = {
      clickPosY: nodeBounds.top,
      clickPosX: nodeBounds.right,
      messageSlug,
    };

    modalOpen('MODAL_REACTION', modalProps);
  }

  handleFavToggle() {
    const { message: { id, favoriteId }, toggleFavorite } = this.props;

    toggleFavorite({ id: favoriteId, messageId: id });
  }

  handleDropdownModal(e) {
    const { modalOpen, message } = this.props;

    const nodeBounds = MessageHoverMenu.getModalBoundingClientRect(e);
    const modalProps = {
      clickPosY: nodeBounds.bottom,
      clickPosX: nodeBounds.right,
      message,
    };

    modalOpen('MODAL_DROPDOWN_MESSAGE', modalProps);
  }

  render() {
    const { message, filterMenuItems, matchUrl } = this.props;

    const isMessageType = message.entityType === 'entry';
    const favIcon = message.favoriteId ? ['fas', 'star'] : ['far', 'star'];
    const favClassName = message.favoriteId ? 'solid' : 'empty';

    let menuItems = [
      {
        key: 'reaction',
        onClick: this.handleReactionToggle,
        icon: <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />,
      },
      {
        key: 'convo',
        link: `${matchUrl}/convo/${message.slug}`,
        icon: <FontAwesomeIcon icon={['far', 'comment']} fixedWidth />,
        hasNoDrawer: true,
        condition: isMessageType,
      },
      {
        key: 'favorite',
        icon: <FontAwesomeIcon icon={favIcon} fixedWidth />,
        onClick: this.handleFavToggle,
        modifierClassName: favClassName,
        condition: isMessageType,
      },
      {
        key: 'dropdown',
        icon: <FontAwesomeIcon icon="ellipsis-h" fixedWidth />,
        onClick: this.handleDropdownModal,
        condition: isMessageType && isMessageType,
      }
    ];

    if (filterMenuItems && filterMenuItems.length) {
      menuItems = menuItems.filter(item => !filterMenuItems.includes(item.key));
    }

    return <Menu menuFor="msg-hover" items={menuItems} isRow unStyled />;
  }
}

export default MessageHoverMenu;
