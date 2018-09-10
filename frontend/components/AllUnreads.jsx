import React, { Fragment } from 'react';
import AllUnreadsItem from './AllUnreadsItem';

class AllUnreads extends React.Component {
  componentDidMount() {
    const { isWorkspaceLoaded, fetchUnreadsRequest, match: { params } } = this.props;

    if (isWorkspaceLoaded) {
      fetchUnreadsRequest(params.workspaceSlug);
    }
  }

  render() {
    const {
      unreadChannels,
      messages,
      authors,
    } = this.props;

    if (!unreadChannels) return null;

    return (
      <Fragment>
        {unreadChannels.map(channel => (
          <AllUnreadsItem
            key={channel.id}
            channel={channel}
            authors={authors}
            messages={messages}
          />
        ))}
      </Fragment>
    );
  }
}

export default AllUnreads;
