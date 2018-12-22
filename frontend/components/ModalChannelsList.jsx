import React from 'react';
import ModalChannelsListItem from './ModalChannelsListItem';
import './ModalChannelsList.css';

class ModalChannelsList extends React.Component {
  componentDidMount() {
    const { fetchChannelsRequest, workspaceSlug } = this.props;
    fetchChannelsRequest(workspaceSlug);
  }

  render() {
    const { channels, workspaceSlug } = this.props;

    return (
      <div className="ModalChannelsList">
        <div className="ModalChannelsList__subhead">
          Channels you can join
        </div>
        <div role="list" className="ModalChannelsList__list">
          {channels.map(ch => (
            <ModalChannelsListItem key={ch.slug} channel={ch} workspaceSlug={workspaceSlug} />
          ))}
        </div>
      </div>
    );
  }
}

export default ModalChannelsList;
