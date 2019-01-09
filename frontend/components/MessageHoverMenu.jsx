import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker from 'emoji-picker-react';
import Menu from './Menu';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.getDdMenuItems = this.getDdMenuItems.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { hasHover, isDdOpen, handleHover } = this.props;

    if (hasHover && !isDdOpen && prevProps.isDdOpen) {
      handleHover(false);
    }
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
        onClick: this.handleDropdownModal,
        icon: <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />,
        dropdownType: `DROPDOWN_REACTION_${message.slug}`,
        dropdownChild: <EmojiPicker onEmojiClick={this.handleEmojiClick} disableDiversityPicker />
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
        icon: <FontAwesomeIcon icon="ellipsis-h" fixedWidth />,
        condition: isEntryType,
        dropdownType: `DROPDOWN_MESSAGE_${message.slug}`,
        dropdownChild: <Menu items={this.getDdMenuItems()} />,
      }
    ];

    if (filterMenuItems && filterMenuItems.length) {
      menuItems = menuItems.filter(item => !filterMenuItems.includes(item.key));
    }

    return <Menu menuFor="msg-hover" items={menuItems} isRow unStyled />;
  }
}

export default MessageHoverMenu;
