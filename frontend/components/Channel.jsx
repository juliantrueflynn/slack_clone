import React from 'react';
import ChannelSubscribe from './ChannelSubscribe';
import MessageForm from './MessageForm';
import ChannelScrollBar from './ChannelScrollBar';
import withWindowResize from './withWindowResize';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { height: 0, hasSwitchedView: false };
    this.updateSizeDimensions = this.updateSizeDimensions.bind(this);
    this.updateHasSwitchedView = this.updateHasSwitchedView.bind(this);
  }

  componentDidMount() {
    this.updateSizeDimensions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { channel, windowWidth: winWidth, windowHeight: winHeight } = this.props;
    const { hasSwitchedView } = this.state;
    const { channel: prevChannel } = prevProps;
    const hasResized = winHeight !== prevProps.windowHeight || winWidth !== prevProps.windowWidth;

    if (channel.slug !== prevChannel.slug || channel.isSub !== prevChannel.isSub || hasResized) {
      this.updateSizeDimensions();
    }

    if (channel.slug !== prevChannel.slug) {
      this.updateHasSwitchedView(true);
    }

    if (channel.slug === prevChannel.slug && hasSwitchedView !== prevState.hasSwitchedView) {
      this.updateHasSwitchedView(false);
    }
  }

  updateHasSwitchedView(hasSwitchedView) {
    this.setState({ hasSwitchedView });
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
      updateScrollLocation,
      createChannelSubRequest,
      fetchHistoryRequest,
      createMessageRequest,
    } = this.props;
    const { height, hasSwitchedView } = this.state;

    const placeholder = channel.hasDm ? `@${channel.title}` : `#${channel.title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;

    return (
      <div className="Channel" ref={this.container}>
        <div className="Channel__body">
          {!isLoading.channel && !hasSwitchedView && (
            <ChannelScrollBar
              channel={channel}
              messages={messages}
              openModal={openModal}
              currentUserSlug={currentUserSlug}
              isFetching={isLoading.history}
              height={height}
              matchUrl={matchUrl}
              updateScrollLocation={updateScrollLocation}
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
