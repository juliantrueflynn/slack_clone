import React from 'react';
import ChannelSubscribe from './ChannelSubscribe';
import MessageForm from './MessageForm';
import ChannelScrollBar from './ChannelScrollBar';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.state = {
      height: 0,
      width: 0,
      didInitMessagesLoad: false
    };

    this.handleWindowResizeStyles = this.handleWindowResizeStyles.bind(this);
  }

  componentDidMount() {
    this.handleWindowResizeStyles();
    window.addEventListener('resize', this.handleWindowResizeStyles);
  }

  componentDidUpdate(prevProps, prevState) {
    const { channel, isLoading } = this.props;
    const { channel: { slug: prevSlug, isSub: prevIsSub } } = prevProps;
    const { height, width } = this.state;
    const { height: prevHeight, width: prevWidth } = prevState;

    const hasResized = height !== prevHeight || width !== prevWidth;

    if (channel.slug !== prevSlug || channel.isSub !== prevIsSub || hasResized) {
      this.handleWindowResizeStyles();
    }

    if (!isLoading.channel && prevProps.isLoading.channel && !isLoading.history) {
      this.updateInitMessagesLoad(true);
    }

    if (channel.slug !== prevSlug) {
      this.updateInitMessagesLoad(false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResizeStyles);
  }

  updateInitMessagesLoad(newState) {
    const { didInitMessagesLoad } = this.state;

    if (didInitMessagesLoad !== newState) {
      this.setState({ didInitMessagesLoad: newState });
    }
  }

  handleWindowResizeStyles() {
    const pageNode = this.container && this.container.current;

    if (pageNode && pageNode.children[1]) {
      const { clientHeight: bottomElHeight } = pageNode.children[1];
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
              isLoading={isLoading}
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

export default Channel;
