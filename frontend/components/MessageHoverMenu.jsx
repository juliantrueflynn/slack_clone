import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleReactionModal = this.handleReactionModal.bind(this);
    this.handleFavToggle = this.handleFavToggle.bind(this);
    this.handleDropdownModal = this.handleDropdownModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { hasHover, isDdOpen, handleHover } = this.props;

    if (hasHover && !isDdOpen && prevProps.isDdOpen) {
      handleHover(false);
    }
  }

  handleReactionModal(e) {
    const { openDropdown, message: { slug: messageSlug } } = this.props;

    const client = e.currentTarget.parentElement.parentElement.getBoundingClientRect();
    const ddProps = {
      posY: client.bottom,
      posX: client.right,
      messageSlug,
    };

    openDropdown('DROPDOWN_REACTION', ddProps);
  }

  handleFavToggle() {
    const { message: { id, favoriteId }, toggleFavorite } = this.props;

    toggleFavorite({ id: favoriteId, messageId: id });
  }

  handleDropdownModal(e) {
    const { openDropdown, message } = this.props;

    const client = e.currentTarget.parentElement.getBoundingClientRect();
    const ddProps = {
      posY: client.bottom,
      posX: client.right,
      message,
    };

    openDropdown('DROPDOWN_MESSAGE', ddProps);
  }

  render() {
    const { message, filterMenuItems, chatPathUrl } = this.props;

    const isMessageType = message.entityType === 'entry';
    const favIcon = message.favoriteId ? ['fas', 'star'] : ['far', 'star'];
    const favClassName = message.favoriteId ? 'solid' : 'empty';

    let menuItems = [
      {
        key: 'reaction',
        onClick: this.handleReactionModal,
        icon: <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />,
      },
      {
        key: 'convo',
        link: `${chatPathUrl}/convo/${message.slug}`,
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
