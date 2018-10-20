import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import Menu from './Menu';
import './ChatsWidget.css';

const ChatsWidget = ({ subbedChannels, workspaceSlug, modalOpen }) => {
  const chatList = subbedChannels.map(item => ({
    icon: <FontAwesomeIcon className="Icon" icon={['fas', 'hashtag']} size="sm" />,
    label: item.title,
    link: `/${workspaceSlug}/messages/${item.slug}`,
    modifierClassName: item.hasUnreads ? 'unread' : null,
  }));
  const chatsModalOpen = () => modalOpen('MODAL_CHATS');
  const chatModalOpen = () => modalOpen('MODAL_CHAT');

  return (
    <div className="SidebarWidget SidebarWidget__chats">
      <header className="SidebarWidget__header">
        <div className="SidebarWidget__title">
          <Button unStyled buttonFor="chats" onClick={chatsModalOpen}>
            Channels
          </Button>
        </div>
        <Button unStyled buttonFor="widget" onClick={chatModalOpen}>
          <FontAwesomeIcon icon={['fas', 'plus-circle']} />
        </Button>
      </header>
      {subbedChannels && <Menu menuFor="chats" items={chatList} />}
    </div>
  );
};

export default ChatsWidget;
