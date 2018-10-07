import React from 'react';
import { withRouter } from 'react-router-dom';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';
import ChannelBlurb from './ChannelBlurb';
import Scrollable from './Scrollable';
import ChannelEntry from './ChannelEntry';
import MessageContainer from './MessageContainer';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scrollLoc: 0 };
    this.handleScrollLoc = this.handleScrollLoc.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { chatPath, switchChannel } = this.props;
    const { scrollLoc } = this.state;

    if (chatPath !== prevProps.chatPath) {
      switchChannel(prevProps.chatPath, scrollLoc);
    }
  }

  handleScrollLoc(scrollLoc) {
    this.setState({ scrollLoc });
  }

  render() {
    const {
      channel,
      messages,
      entries,
      users,
      fetchHistoryRequest,
      createChannelSubRequest,
      currentUser,
      isLoading,
    } = this.props;

    const placeholder = channel.hasDm ? `@${channel.title}` : channel.title;
    const formPlaceholder = placeholder && `Message ${placeholder}`;

    return (
      <div className="Channel">
        {isLoading || (
          <Scrollable
            fetchHistoryRequest={fetchHistoryRequest}
            updateScrollLoc={this.handleScrollLoc}
            currentUserId={currentUser.id}
            messages={messages}
            channel={channel}
            isAutoScroll
          >
            <ChannelBlurb channel={channel} currentUserSlug={currentUser.slug} />
            {entries.map(message => (
              <MessageContainer key={message.id} message={message} users={users} />
            ))}
          </Scrollable>
        )}
        <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} />
        <ChannelSubscribe
          channel={channel}
          createChannelSubRequest={createChannelSubRequest}
        />
      </div>
    );
  }
}

export default withRouter(Channel);
