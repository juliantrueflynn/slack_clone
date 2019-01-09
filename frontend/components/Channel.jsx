import React from 'react';
import ChannelSubscribe from './ChannelSubscribe';
import MessageForm from './MessageForm';
import ChannelScrollBar from './ChannelScrollBar';
import withWindowResize from './withWindowResize';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { height: 0, hasInitLoadDone: false };
    this.updateSizeDimensions = this.updateSizeDimensions.bind(this);
    this.updateHasInitLoadDone = this.updateHasInitLoadDone.bind(this);
  }

  componentDidMount() {
    this.updateSizeDimensions();
    this.updateHasInitLoadDone(true);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      channel,
      windowWidth: winWidth,
      windowHeight: winHeight,
      isLoading,
    } = this.props;
    const { hasInitLoadDone } = this.state;
    const { channel: { isSub: prevIsSub, slug: prevSlug } } = prevProps;

    const hasResized = winHeight !== prevProps.windowHeight || winWidth !== prevProps.windowWidth;
    const hasLoaded = isLoading.channel !== prevProps.isLoading.channel;

    if (hasLoaded || channel.isSub !== prevIsSub || hasResized) {
      this.updateSizeDimensions();
    }

    if (channel.slug !== prevSlug) {
      this.updateHasInitLoadDone(false);
      this.updateSizeDimensions();
    }

    if (channel.slug === prevSlug && hasInitLoadDone !== prevState.hasInitLoadDone) {
      this.updateHasInitLoadDone(true);
    }
  }

  updateHasInitLoadDone(hasInitLoadDone) {
    this.setState({ hasInitLoadDone });
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
    const { hasInitLoadDone, height } = this.state;
    const { isSub, hasDm, title } = channel;

    const hasLoaded = (!isLoading.channel && hasInitLoadDone) || !channel.shouldFetch;
    const placeholder = hasDm ? `@${title}` : `#${title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const style = { height };

    return (
      <div className="Channel" ref={this.container}>
        <div className="Channel__body">
          {hasLoaded && (
            <ChannelScrollBar
              channel={channel}
              messages={messages}
              openModal={openModal}
              currentUserSlug={currentUserSlug}
              isFetching={isLoading.history}
              matchUrl={matchUrl}
              updateScrollLocation={updateScrollLocation}
              fetchHistoryRequest={fetchHistoryRequest}
              style={style}
            />
          )}
        </div>
        {isSub && (
          <MessageForm
            channelId={channel.id}
            placeholder={formPlaceholder}
            createMessageRequest={createMessageRequest}
          />
        )}
        {hasLoaded && !isSub && !hasDm && (
          <ChannelSubscribe
            createChannelSubRequest={createChannelSubRequest}
            matchUrl={matchUrl}
            channelId={channel.id}
            channelTitle={channel.title}
            createdAt={channel.createdAt}
            ownerName={channel.ownerName}
          />
        )}
      </div>
    );
  }
}

export default withWindowResize(Channel);
