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
    const { messages, clearUnreads } = this.props;
    const messageSlug = channel.messages[channel.messages.length - 1];
    const lastMessage = messages[messageSlug];

    clearUnreads(channel.slug, lastMessage.createdAt);
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
            key={channel.id}
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
