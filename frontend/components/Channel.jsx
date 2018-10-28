import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import ChannelSubscribe from './ChannelSubscribe';
import ChannelBlurb from './ChannelBlurb';
import Scrollable from './Scrollable';
import MessagesList from './MessagesList';
import MessageFormContainer from './MessageFormContainer';

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
      fetchHistoryRequest,
      createChannelSubRequest,
      currentUserSlug,
      isLoading,
    } = this.props;

    const placeholder = channel.hasDm ? `@${channel.title}` : `#${channel.title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;

    const channelClassNames = classNames('Channel', {
      'Channel--sub': channel.isSub,
      'Channel--unsub': !channel.isSub,
    });

    return (
      <div className={channelClassNames}>
        {isLoading || (
          <Scrollable
            fetchHistoryRequest={fetchHistoryRequest}
            updateScrollLoc={this.handleScrollLoc}
            messages={messages}
            channel={channel}
            isAutoScroll
          >
            <ChannelBlurb channel={channel} currentUserSlug={currentUserSlug} />
            <MessagesList role="listitem" messages={messages} isDm={channel.hasDm} />
          </Scrollable>
        )}
        {/* {channel.isSub && (
          <MessageFormContainer channelId={channel.id} placeholder={formPlaceholder} />
        )} */}
        <ChannelSubscribe
          channel={channel}
          createChannelSubRequest={createChannelSubRequest}
        />
      </div>
    );
  }
}

export default withRouter(Channel);
