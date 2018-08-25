import React from 'react';
import { Link } from 'react-router-dom';
import withModal from './withModal';

class ChatsModal extends React.Component {
  componentDidMount() {
    const { fetchChannelsRequest, workspaceSlug } = this.props;
    fetchChannelsRequest(workspaceSlug);
  }

  render() {
    const { unsubbedChannels, workspaceSlug } = this.props;

    return (
      <div className="ChatsModal">
        <div role="list" className="ChatsModal__list">
          {unsubbedChannels && unsubbedChannels.map(chat => (
            <Link role="listitem" to={`/${workspaceSlug}/${chat.slug}`} className="ChatsModal__item" key={chat.id}>
              <h3 className="ChatsModalItem__title">
                {chat.title}
              </h3>
              <div className="ChatsModalItem__body">
                <div className="ChatsModalItem__date">
                  {chat.createdAt}
                </div>
                <div className="ChatsModalItem__owner">
                  {chat.ownerId}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const modalProps = {
  modalType: 'MODAL_CHATS',
  modalTitle: 'Browse channels'
};

export default withModal(modalProps)(ChatsModal);
