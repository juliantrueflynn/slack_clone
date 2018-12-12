import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { isOnSameDay } from '../util/dateUtil';
import ScrollBar from './ScrollBar';
import ChannelSubscribe from './ChannelSubscribe';
import ChannelBlurb from './ChannelBlurb';
import MessagesListContainer from './MessagesListContainer';
import MessageForm from './MessageForm';
import './Channel.css';

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.state = {
      height: 0,
      width: 0,
      hasHistory: false,
      isInitLoadingDone: false,
    };

    this.handleWindowResizeStyles = this.handleWindowResizeStyles.bind(this);
    this.handleFetchHistory = this.handleFetchHistory.bind(this);
  }

  componentDidMount() {
    this.handleWindowResizeStyles();
    window.addEventListener('resize', this.handleWindowResizeStyles);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading, channel } = this.props;
    const { channel: { slug: prevSlug, isSub: prevIsSub } } = prevProps;
    const { height, width } = this.state;
    const { height: prevHeight, width: prevWidth } = prevState;

    const hasResized = height !== prevHeight || width !== prevWidth;

    if (channel.slug !== prevSlug || channel.isSub !== prevIsSub || hasResized) {
      this.handleWindowResizeStyles();
    }

    if (channel.slug !== prevSlug) {
      this.resetHasHistory();
    }

    if (!isLoading.channel && prevProps.isLoading.channel) {
      this.setHistoryAndLoadingState();
    }

    if (!isLoading.history && prevProps.isLoading.history) {
      this.setHistoryAndLoadingState();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResizeStyles);
  }

  setHistoryAndLoadingState() {
    const { messages, channel } = this.props;

    const firstMsgDate = messages[0] && messages[0].createdAt;
    const parents = messages.filter(msg => !msg.parentMessageId || msg.entityType === 'entry');
    const isNotEarliestMsgDate = !isOnSameDay(firstMsgDate, channel.createdAt);
    const nextState = {};

    if (!messages[0] || parents.length < 13) {
      nextState.hasHistory = false;
    } else {
      nextState.hasHistory = isNotEarliestMsgDate;
    }

    nextState.isInitLoadingDone = true;

    this.setState(nextState);
  }

  resetHasHistory() {
    this.setState({ hasHistory: false });
  }

  handleWindowResizeStyles() {
    const pageNode = this.container && this.container.current;

    if (pageNode && pageNode.children[1]) {
      const { clientHeight: bottomElHeight } = pageNode.children[1];
      const { height: channelHeight, width } = pageNode.getBoundingClientRect();
      const height = channelHeight - bottomElHeight;

      this.setState({ height, width });
    }
  }

  handleFetchHistory() {
    const { channel, fetchHistoryRequest, messages } = this.props;
    const { hasHistory } = this.state;
    const parents = messages.filter(msg => !msg.parentMessageId);
    const startDate = parents[0] && parents[0].createdAt;

    if (hasHistory && startDate) {
      fetchHistoryRequest(channel.slug, startDate);
    }
  }

  render() {
    const {
      isLoading,
      channel,
      messages,
      createChannelSubRequest,
      updateScrollTop,
      currentUserSlug,
      openModal,
      match: { url },
    } = this.props;
    const { height, hasHistory, isInitLoadingDone } = this.state;

    const lastMessage = messages[messages.length - 1];
    const placeholder = channel.hasDm ? `@${channel.title}` : `#${channel.title}`;
    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const style = { height };

    const channelClassNames = classNames('Channel', {
      'Channel--loading-history': isLoading.history,
      'Channel--has-history': hasHistory,
    });

    return (
      <div className={channelClassNames} data-channel-slug={channel.slug} ref={this.container}>
        <div className="Channel__body" style={style}>
          {isInitLoadingDone && !isLoading.channel && (
            <ScrollBar
              fetchHistory={this.handleFetchHistory}
              isLoading={isLoading.history}
              channelScrollLoc={channel.scrollLoc}
              currentUserSlug={currentUserSlug}
              lastMessage={lastMessage}
              updateScrollTop={updateScrollTop}
              channel={channel}
              shouldAutoScroll
            >
              <ChannelBlurb
                channel={channel}
                currentUserSlug={currentUserSlug}
                openModal={openModal}
                matchUrl={url}
              />
              <div className="Channel__history-loader">Loading...</div>
              <MessagesListContainer
                role="listitem"
                messages={messages}
                isDm={channel.hasDm}
                isHighlightable
                isHoverable
              />
            </ScrollBar>
          )}
        </div>
        {channel.isSub && <MessageForm channelId={channel.id} placeholder={formPlaceholder} />}
        {channel.isSub || channel.hasDm || (
          <ChannelSubscribe
            createChannelSubRequest={createChannelSubRequest}
            matchUrl={url}
            {...channel}
          />
        )}
      </div>
    );
  }
}

export default withRouter(Channel);
