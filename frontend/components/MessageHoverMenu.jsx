import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropdownModal = this.handleDropdownModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { hasHover, isDdOpen, handleHover } = this.props;

    if (hasHover && !isDdOpen && prevProps.isDdOpen) {
      handleHover(false);
    }
  }

  handleDropdownModal(e) {
    const { openDropdown, message } = this.props;

    const btn = e.currentTarget;
    const ddType = btn.getAttribute('data-ddtype');
    const client = btn.parentElement.parentElement.getBoundingClientRect();
    const ddProps = { posY: client.bottom, posX: client.right, message };

    openDropdown(`DROPDOWN_${ddType}`, ddProps);
  }

  render() {
    const {
      message,
      filterMenuItems,
      chatPathUrl,
      toggleFavorite,
    } = this.props;

    const { id: messageId, slug, favoriteId } = message;
    const isEntryType = message.entityType === 'entry';
    const favIcon = favoriteId ? ['fas', 'star'] : ['far', 'star'];
    const favClassName = favoriteId ? 'solid' : 'empty';

    let menuItems = [
      {
        key: 'reaction',
        'data-ddtype': 'REACTION',
        onClick: this.handleDropdownModal,
        icon: <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />,
      },
      {
        key: 'convo',
        link: `${chatPathUrl}/convo/${slug}`,
        icon: <FontAwesomeIcon icon={['far', 'comment']} fixedWidth />,
        hasNoDrawer: true,
        condition: isEntryType && !message.parentMessageId,
      },
      {
        key: 'favorite',
        icon: <FontAwesomeIcon icon={favIcon} fixedWidth />,
        onClick: () => toggleFavorite({ id: favoriteId, messageId }),
        modifierClassName: favClassName,
        condition: isEntryType,
      },
      {
        key: 'dropdown',
        'data-ddtype': 'MESSAGE',
        icon: <FontAwesomeIcon icon="ellipsis-h" fixedWidth />,
        onClick: this.handleDropdownModal,
        condition: isEntryType,
      }
    ];

    if (filterMenuItems && filterMenuItems.length) {
      menuItems = menuItems.filter(item => !filterMenuItems.includes(item.key));
    }

    return <Menu menuFor="msg-hover" items={menuItems} isRow unStyled />;
  }
}

export default MessageHoverMenu;
