import React from 'react';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import UnreadsItem from './UnreadsItem';

class Unreads extends React.Component {
  componentDidMount() {
    const { isWorkspaceLoaded, fetchUnreadsRequest, workspaceSlug } = this.props;
    if (isWorkspaceLoaded) fetchUnreadsRequest(workspaceSlug);
  }

  render() {
    const { unreadChannels, messages, authors } = this.props;

    if (!unreadChannels) return null;

    return (
      <div className="ChannelPage ChannelPage__unreads">
        <ChannelHeaderContainer sectionTitle="All Unreads" />
        {unreadChannels.map(channel => (
          <UnreadsItem
            key={channel.id}
            channel={channel}
            authors={authors}
            messages={messages}
          />
        ))}
      </div>
    );
  }
}

export default Unreads;
