import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import Menu from './Menu';
import ChatModal from './ChatModal';
import ChatsModal from './ChatsModal';

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
      icon: <FontAwesomeIcon icon={['fas', 'hashtag']} />,
      label: item.title,
      link: `/${workspaceSlug}/${item.slug}`,
    }));

    return (
      <div className="SidebarWidget">
        <header className="SidebarWidget__header">
          <span className="SidebarWidget__title">
            <Button onClick={() => this.handleModalOpen('CHATS')}>
              Channels
            </Button>
          </span>
          <Button className="Btn__widget" onClick={() => this.handleModalOpen('CHAT')}>
            <FontAwesomeIcon icon={['fas', 'plus-circle']} />
          </Button>
        </header>
        {subbedChannels && (<Menu items={chatList} />)}

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
