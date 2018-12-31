import React from 'react';
import ChannelSubscribe from './ChannelSubscribe';
import MessageForm from './MessageForm';
import ChannelScrollBar from './ChannelScrollBar';
import withWindowResize from './withWindowResize';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { height: 0, didInitMessagesLoad: false };
    this.updateSizeDimensions = this.updateSizeDimensions.bind(this);
  }

  componentDidMount() {
    this.updateSizeDimensions();
  }

  componentDidUpdate(prevProps) {
    const {
      channel,
      isLoading,
      windowWidth: winWidth,
      windowHeight: winHeight,
    } = this.props;
    const { channel: prevChannel } = prevProps;
    const hasResized = winHeight !== prevProps.windowHeight || winWidth !== prevProps.windowWidth;

    if (channel.slug !== prevChannel.slug || channel.isSub !== prevChannel.isSub || hasResized) {
      this.updateSizeDimensions();
    }

    if (!isLoading.channel && prevProps.isLoading.channel && !isLoading.history) {
      this.updateInitMessagesLoad(true);
    }

    if (channel.slug !== prevChannel.slug) {
      this.updateInitMessagesLoad(false);
    }
  }

  updateInitMessagesLoad(newState) {
    const { didInitMessagesLoad } = this.state;

    if (didInitMessagesLoad !== newState) {
      this.setState({ didInitMessagesLoad: newState });
    }
  }

  updateSizeDimensions() {
    const pageNode = this.container && this.container.current;
    const bottomEl = pageNode && pageNode.children[1];

    if (bottomEl) {
      const { clientHeight: bottomElHeight } = bottomEl;
      const { height: channelHeight } = pageNode.getBoundingClientRect();
      const height = channelHeight - bottomElHeight;

      this.setState({ height });
    }
  }

  render() {
    const {
      isLoading,
      channel,
      messages,
      currentUserSlug,
      openModal,
      matchUrl,
      updateScrollTop,
      createChannelSubRequest,
      fetchHistoryRequest,
      createMessageRequest,
    } = this.props;
    const { height, didInitMessagesLoad } = this.state;

    const placeholder = channel.hasDm ? `@${channel.title}` : `#${channel.title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;

    return (
      <div className="Channel" ref={this.container}>
        <div className="Channel__body">
          {!isLoading.channel && didInitMessagesLoad && (
            <ChannelScrollBar
              channel={channel}
              messages={messages}
              openModal={openModal}
              currentUserSlug={currentUserSlug}
              isFetching={isLoading.history}
              height={height}
              matchUrl={matchUrl}
              updateScrollTop={updateScrollTop}
              fetchHistoryRequest={fetchHistoryRequest}
            />
          )}
        </div>
        {channel.isSub && (
          <MessageForm
            channelId={channel.id}
            placeholder={formPlaceholder}
            createMessageRequest={createMessageRequest}
          />
        )}
        {channel.isSub || channel.hasDm || (
          <ChannelSubscribe
            createChannelSubRequest={createChannelSubRequest}
            matchUrl={matchUrl}
            {...channel}
          />
        )}
      </div>
    );
  }
}

export default withWindowResize(Channel);
