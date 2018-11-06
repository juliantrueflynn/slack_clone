import React from 'react';
import ChatsModalItem from './ChatsModalItem';
import Modal from './Modal';
import './ChatsModal.css';

class ChatsModal extends React.Component {
  componentDidMount() {
    const { fetchChannelsRequest, workspaceSlug } = this.props;
    fetchChannelsRequest(workspaceSlug);
  }

  render() {
    const { channels, workspaceSlug, modalClose } = this.props;
    const unsubbedChannels = channels.filter(ch => !ch.isSub && !ch.hasDm);

    return (
      <Modal isOpen modalFor="chats" modalTitle="Browse channels" close={modalClose}>
        <div className="ChatsModal">
          <div className="ChatsModal__subhead">
            Channels you can join
          </div>
          <div role="list" className="ChatsModal__list">
            {unsubbedChannels && unsubbedChannels.map(ch => (
              <ChatsModalItem key={ch.slug} channel={ch} workspaceSlug={workspaceSlug} />
            ))}
          </div>
        </div>
      </Modal>
    );
  }
}

export default ChatsModal;
