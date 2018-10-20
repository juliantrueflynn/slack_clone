import React from 'react';
import withModal from './withModal';
import ChatsModalItem from './ChatsModalItem';
import './ChatsModal.css';

class ChatsModal extends React.Component {
  componentDidMount() {
    const { fetchChannelsRequest, workspaceSlug } = this.props;
    fetchChannelsRequest(workspaceSlug);
  }

  render() {
    const { unsubbedChannels, workspaceSlug } = this.props;

    return (
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
    );
  }
}

const modalProps = { modalType: 'MODAL_CHATS', modalTitle: 'Browse channels' };

export default withModal(modalProps)(ChatsModal);
