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

  componentDidUpdate(prevProps) {
    const {
      chatroom,
      windowWidth: winWidth,
      windowHeight: winHeight,
      isLoading,
    } = this.props;
    const { chatroom: { isSub: prevIsSub, slug: prevSlug } } = prevProps;

    const hasResized = winHeight !== prevProps.windowHeight || winWidth !== prevProps.windowWidth;
    const hasLoaded = isLoading.chatroom !== prevProps.isLoading.chatroom;

    if (hasLoaded || chatroom.isSub !== prevIsSub || hasResized) {
      this.updateSizeDimensions();
    }

    if (chatroom.slug !== prevSlug) {
      this.updateHasInitLoadDone(false);
      this.updateSizeDimensions();
    }

    if (chatroom.slug === prevSlug) {
      this.updateHasInitLoadDone(true);
    }
  }

  updateHasInitLoadDone(nextState) {
    const { hasInitLoadDone } = this.state;

    if (hasInitLoadDone !== nextState) {
      this.setState({ hasInitLoadDone: nextState });
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
      chatroom,
      messages,
      currentUserSlug,
      openModal,
      matchUrl,
      updateScrollLocation,
      createChatroomSubRequest,
      fetchHistoryRequest,
      createMessageRequest,
    } = this.props;
    const { hasInitLoadDone, height } = this.state;
    const { isSub, hasDm, title } = chatroom;

    const hasLoaded = !isLoading.chatroom && hasInitLoadDone;
    const placeholder = hasDm ? `@${title}` : `#${title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const style = { height };

    return (
      <div className="Channel" ref={this.container}>
        <div className="Channel__body">
          {hasLoaded && (
            <ChannelScrollBar
              chatroom={chatroom}
              messages={messages}
              openModal={openModal}
              currentUserSlug={currentUserSlug}
              isFetching={isLoading.messages}
              matchUrl={matchUrl}
              updateScrollLocation={updateScrollLocation}
              fetchHistoryRequest={fetchHistoryRequest}
              style={style}
            />
          )}
        </div>
        {isSub && (
          <MessageForm
            chatroomId={chatroom.id}
            placeholder={formPlaceholder}
            createMessageRequest={createMessageRequest}
          />
        )}
        {hasLoaded && !isSub && !hasDm && (
          <ChannelSubscribe
            createChatroomSubRequest={createChatroomSubRequest}
            matchUrl={matchUrl}
            chatroomId={chatroom.id}
            chatroomTitle={chatroom.title}
            createdAt={chatroom.createdAt}
            ownerName={chatroom.ownerName}
          />
        )}
      </div>
    );
  }
}

export default withWindowResize(Channel);
