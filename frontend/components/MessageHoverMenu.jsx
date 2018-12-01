import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import './MessageHoverMenu.css';

class MessageHoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleReactionToggle = this.handleReactionToggle.bind(this);
    this.handleFavToggle = this.handleFavToggle.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleReactionToggle(e) {
    const { modalOpen, slug: messageSlug } = this.props;

    const menuNode = e.currentTarget.parentElement.parentElement;
    const nodeBounds = menuNode.getBoundingClientRect();
    const modalProps = {
      clickPosY: nodeBounds.top,
      clickPosX: nodeBounds.right,
      messageSlug,
    };

    modalOpen('MODAL_REACTION', modalProps);
  }

  handleFavToggle() {
    const {
      id: messageId,
      favoriteId: id,
      toggleFavorite,
    } = this.props;

    toggleFavorite({ id, messageId });
  }

  handleOverlayClick(e) {
    const { ddToggle } = this.props;
    ddToggle(e.target, false);
  }

  render() {
    const {
      toggleEditor,
      id,
      slug,
      favoriteId,
      entityType,
      authorSlug,
      pinId,
      currentUserSlug,
      createPinRequest,
      destroyPinRequest,
      ddToggle,
      deleteMessageRequest,
      filterMenuItems,
      matchUrl,
    } = this.props;

    const isMessageType = entityType === 'entry';
    const byCurrUser = currentUserSlug === authorSlug;
    const favIcon = favoriteId ? ['fas', 'star'] : ['far', 'star'];
    const favClassName = favoriteId ? 'solid' : 'empty';

    let menuItems = [
      {
        key: 'reaction',
        onClick: this.handleReactionToggle,
        icon: <FontAwesomeIcon icon={['far', 'smile']} fixedWidth />,
      },
      {
        key: 'convo',
        link: `${matchUrl}/convo/${slug}`,
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
        menuPos: 'right',
        shouldPos: true,
        onOverlayClick: this.handleOverlayClick,
        ddToggle,
        condition: isMessageType && isMessageType,
        items: [
          {
            label: 'Un-pin message',
            onClick: () => destroyPinRequest(pinId),
            condition: pinId,
          },
          {
            label: 'Pin message',
            onClick: () => createPinRequest({ messageId: id }),
            condition: !pinId,
          },
          {
            label: 'Edit message',
            onClick: () => toggleEditor(slug),
            condition: byCurrUser,
          },
          {
            label: 'Delete message',
            onClick: () => deleteMessageRequest(slug),
            condition: byCurrUser,
          }
        ],
      }
    ];

    if (filterMenuItems && filterMenuItems.length) {
      menuItems = menuItems.filter(item => !filterMenuItems.includes(item.key));
    }

    return <Menu menuFor="msg-hover" items={menuItems} isRow unStyled />;
  }
}

export default MessageHoverMenu;
