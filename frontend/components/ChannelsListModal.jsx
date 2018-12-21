import React from 'react';
import ChannelsListModalItem from './ChannelsListModalItem';
import './ChannelsListModal.css';

class ChannelsListModal extends React.Component {
  componentDidMount() {
    const { fetchChannelsRequest, workspaceSlug } = this.props;
    fetchChannelsRequest(workspaceSlug);
  }

  render() {
    const { channels, workspaceSlug } = this.props;

    return (
      <div className="ChannelsListModal">
        <div className="ChannelsListModal__subhead">
          Channels you can join
        </div>
        <div role="list" className="ChannelsListModal__list">
          {channels.map(ch => (
            <ChannelsListModalItem key={ch.slug} channel={ch} workspaceSlug={workspaceSlug} />
          ))}
        </div>
      </div>
    );
  }
}

export default ChannelsListModal;
