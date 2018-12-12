import React from 'react';
import EmptyDisplay from './EmptyDisplay';
import ScrollBar from './ScrollBar';
import AllUnreadsItem from './AllUnreadsItem';

class AllUnreads extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearUnreadsClick = this.handleClearUnreadsClick.bind(this);
  }

  handleClearUnreadsClick(channel) {
    const { clearUnreads } = this.props;

    clearUnreads(channel.slug, channel.lastActive);
  }

  render() {
    const { channels, clearUnreads, ...props } = this.props;

    if (!channels.length) {
      return (
        <EmptyDisplay topIcon={['far', 'smile-beam']} topIconHexColor="#FECB6E">
          You&#8217;re all caught up!
        </EmptyDisplay>
      );
    }

    return (
      <ScrollBar>
        {channels.map(channel => (
          <AllUnreadsItem
            key={channel.slug}
            channel={channel}
            clearChannelUnreads={this.handleClearUnreadsClick}
            {...props}
          />
        ))}
      </ScrollBar>
    );
  }
}

export default AllUnreads;
