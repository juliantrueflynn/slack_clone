import React from 'react';
import EmptyDisplay from './EmptyDisplay';
import ScrollBar from './ScrollBar';
import AllUnreadsItem from './AllUnreadsItem';

class AllUnreads extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearUnreadsClick = this.handleClearUnreadsClick.bind(this);
  }

  handleClearUnreadsClick(chatroom) {
    const { clearAllUnread } = this.props;

    clearAllUnread(chatroom.slug, chatroom.lastActive);
  }

  render() {
    const {
      chatrooms,
      clearAllUnread,
      isLoading,
      ...props
    } = this.props;

    if (isLoading) {
      return <EmptyDisplay loadingIcon="circle-notch" />;
    }

    if (!chatrooms.length) {
      return (
        <EmptyDisplay topIcon={['far', 'smile']} topIconHexColor="#FECB6E">
          You&#8217;re all caught up!
        </EmptyDisplay>
      );
    }

    return (
      <ScrollBar>
        {chatrooms.map(ch => (
          <AllUnreadsItem
            key={ch.slug}
            chatroom={ch}
            clearChannelUnreads={this.handleClearUnreadsClick}
            {...props}
          />
        ))}
      </ScrollBar>
    );
  }
}

export default AllUnreads;
