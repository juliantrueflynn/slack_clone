import React from 'react';
import ChannelSubscribe from './ChannelSubscribe';
import MessageForm from './MessageForm';
import ChannelScrollBar from './ChannelScrollBar';
import withWindowResize from './withWindowResize';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { height: 0, hasInitLoadDone: false, hasHistory: false };
    this.updateSizeDimensions = this.updateSizeDimensions.bind(this);
    this.updateHasInitLoadDone = this.updateHasInitLoadDone.bind(this);
  }

  componentDidMount() {
    this.updateSizeDimensions();
    this.updateHasInitLoadDone(true);
    this.updateHasHistory();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      channel: { slug, isSub, messages },
      windowWidth: winWidth,
      windowHeight: winHeight,
    } = this.props;
    const { hasInitLoadDone } = this.state;
    const { channel: { messages: prevMsgs, isSub: prevIsSub, slug: prevSlug } } = prevProps;
    const hasResized = winHeight !== prevProps.windowHeight || winWidth !== prevProps.windowWidth;

    if (slug !== prevSlug || isSub !== prevIsSub || hasResized) {
      this.updateSizeDimensions();
    }

    if (slug !== prevSlug) {
      this.updateHasInitLoadDone(false);
    }

    if (slug === prevSlug && hasInitLoadDone !== prevState.hasInitLoadDone) {
      this.updateHasInitLoadDone(true);
    }

    if (hasInitLoadDone && messages.length !== prevMsgs.length) {
      this.updateHasHistory();
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

  updateHasHistory() {
    const { messages, channel: { earliestMessageSlug } } = this.props;
    const firstMsgSlug = messages[0] && messages[0].slug;
    const hasHistory = firstMsgSlug && firstMsgSlug !== earliestMessageSlug;

    this.setState({ hasHistory });
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
    const { hasInitLoadDone, ...state } = this.state;

    const placeholder = channel.hasDm ? `@${channel.title}` : `#${channel.title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;

    return (
      <div className="Channel" ref={this.container}>
        <div className="Channel__body">
          {!isLoading.channel && hasInitLoadDone && (
            <ChannelScrollBar
              channel={channel}
              messages={messages}
              openModal={openModal}
              currentUserSlug={currentUserSlug}
              isFetching={isLoading.history}
              matchUrl={matchUrl}
              updateScrollLocation={updateScrollLocation}
              fetchHistoryRequest={fetchHistoryRequest}
              {...state}
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
