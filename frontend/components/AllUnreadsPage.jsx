import React from 'react';
import UnreadEntry from './UnreadEntry';

class AllUnreadsPage extends React.Component {
  componentDidMount() {
    const { workspaceId, fetchUnreadsRequest } = this.props;
    if (workspaceId) fetchUnreadsRequest(workspaceId);
  }

  render() {
    const { unreadChannels, messages, authors } = this.props;

    if (!messages || !unreadChannels) return null;

    return (
      <div className="page page__unreads">
        {unreadChannels.map(channel => (
          <div key={channel.slug}>
            <h4>
              #
              {channel.slug}
            </h4>
            {channel.messages && (
              <UnreadEntry
                authors={authors}
                messages={channel.messages.reduce((acc, curr) => {
                  acc[curr] = messages[curr];
                  return acc;
                }, {})}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default AllUnreadsPage;
