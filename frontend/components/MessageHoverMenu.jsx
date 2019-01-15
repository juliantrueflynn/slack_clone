import React from 'react';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker from 'emoji-picker-react';
import Menu from './Menu';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.getDdMenuItems = this.getDdMenuItems.bind(this);
  }

  getMenuItems() {
    const {
      message,
      filterMenuItems,
      chatPathUrl,
      toggleFavorite,
    } = this.props;

    const { id: messageId, slug, favoriteId } = message;
    const isEntryType = message.entityType === 'entry';
    const favIcon = favoriteId ? 'star' : farStar;
    const favClassName = favoriteId ? 'solid' : 'empty';

    let menuItems = [
      {
        key: 'reaction',
        icon: <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />,
        bemModifier: 'reaction',
        dropdownType: `DROPDOWN_REACTION_${message.slug}`,
        dropdownChild: <EmojiPicker onEmojiClick={this.handleEmojiClick} disableDiversityPicker />,
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
        icon: <FontAwesomeIcon icon={faEllipsisH} fixedWidth />,
        bemModifier: 'msg-dd',
        dropdownType: `DROPDOWN_MESSAGE_${message.slug}`,
        dropdownChild: <Menu items={this.getDdMenuItems()} />,
        condition: isEntryType,
      }
    ];

    if (filterMenuItems && filterMenuItems.length) {
      menuItems = menuItems.filter(item => !filterMenuItems.includes(item.key));
    }

    return menuItems;
  }

  getDdMenuItems() {
    const {
      message,
      deleteMessageRequest,
      createPinRequest,
      destroyPinRequest,
      toggleMessageEditor,
      currentUserSlug,
    } = this.props;

    return [
      {
        label: 'Un-pin message',
        onClick: () => destroyPinRequest(message.pinId),
        condition: !!message.pinId,
      },
      {
        label: 'Pin message',
        onClick: () => createPinRequest({ messageId: message.id }),
        condition: !message.pinId,
      },
      {
        label: 'Edit message',
        onClick: () => toggleMessageEditor(message.slug),
        condition: message.authorSlug === currentUserSlug,
      },
      {
        label: 'Delete message',
        onClick: () => deleteMessageRequest(message.slug),
        condition: message.authorSlug === currentUserSlug,
      }
    ];
  }

  handleEmojiClick(_, emoji) {
    const { message, toggleReaction, closeDropdown } = this.props;
    toggleReaction({ messageSlug: message.slug, emoji: emoji.name });
    closeDropdown();
  }

  render() {
    const menuItems = this.getMenuItems();

    return <Menu className="MessageHoverMenu" items={menuItems} />;
  }
}

export default MessageHoverMenu;
