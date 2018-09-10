import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import Menu from './Menu';
import ChatModal from './ChatModal';
import ChatsModal from './ChatsModal';
import './ChatsWidget.css';

class ChatsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  handleModalOpen(modalType) {
    const { modalOpen } = this.props;
    modalOpen(`MODAL_${modalType}`);
  }

  render() {
    const {
      unsubbedChannels,
      subbedChannels,
      workspaceSlug,
      workspaceId,
      createChannelRequest,
      fetchChannelsRequest,
    } = this.props;

    const chatList = subbedChannels.map(item => ({
      icon: <FontAwesomeIcon className="Icon" icon={['fas', 'hashtag']} size="sm" />,
      label: item.title,
      link: `/${workspaceSlug}/${item.slug}`,
    }));

    return (
      <div className="SidebarWidget SidebarWidget__chats">
        <header className="SidebarWidget__header">
          <span className="SidebarWidget__title">
            <Button unStyled buttonFor="chats" onClick={() => this.handleModalOpen('CHATS')}>
              Channels
            </Button>
          </span>
          <Button unStyled buttonFor="widget" onClick={() => this.handleModalOpen('CHAT')}>
            <FontAwesomeIcon icon={['fas', 'plus-circle']} />
          </Button>
        </header>
        {subbedChannels && <Menu menuFor="chats" items={chatList} />}
        <ChatModal
          workspaceId={workspaceId}
          createChannelRequest={createChannelRequest}
        />
        <ChatsModal
          workspaceId={workspaceSlug}
          workspaceSlug={workspaceSlug}
          unsubbedChannels={unsubbedChannels}
          createChannelRequest={createChannelRequest}
          fetchChannelsRequest={fetchChannelsRequest}
        />
      </div>
    );
  }
}

export default ChatsWidget;
