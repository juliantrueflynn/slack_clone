import React from 'react';
import classNames from 'classnames';
import { isOnSameDay } from '../util/dateUtil';
import ScrollBar from './ScrollBar';
import ChannelBlurb from './ChannelBlurb';
import MessagesListContainer from './MessagesListContainer';
import withScrollManager from './withScrollManager';
import './ChannelScrollBar.css';

class ChannelScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scrollbar = React.createRef();
    this.state = { scrollerHeight: 0 };
    this.handleFetchHistory = this.handleFetchHistory.bind(this);
    this.prevChannelSlug = null;
  }

  componentDidMount() {
    const {
      channel: { slug, scrollLoc },
      scrollTo,
      scrollToBottom,
      currentScrollTop,
    } = this.props;

    if (scrollLoc || scrollLoc === 0) {
      scrollTo(scrollLoc);
    } else {
      scrollToBottom();
    }

    if (currentScrollTop <= 50) {
      this.handleFetchHistory();
    }

    this.prevChannelSlug = slug;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isFetching,
      containerRef,
      scrollTo,
      isAtTop,
    } = this.props;

    if (isFetching && !prevProps.isFetching) {
      this.updateScrollerHeight(containerRef.current._container.scrollHeight);
    }

    if (!isFetching && prevProps.isFetching) {
      const height = containerRef.current._container.scrollHeight - prevState.scrollerHeight;
      scrollTo(height);
    }

    if (isAtTop && !prevProps.isAtTop) {
      this.handleFetchHistory();
    }
  }

  componentWillUnmount() {
    const { updateScrollLocation, currentScrollTop, isAtBottom } = this.props;

    if (!isAtBottom) {
      updateScrollLocation(this.prevChannelSlug, currentScrollTop());
    }
  }

  updateScrollerHeight(scrollerHeight) {
    this.setState({ scrollerHeight });
  }

  handleFetchHistory() {
    const {
      channel,
      fetchHistoryRequest,
      messages,
      isFetching,
    } = this.props;

    const parents = messages.filter(msg => !msg.parentMessageId);
    const startDate = parents[0] && parents[0].createdAt;

    if (!isFetching && this.shouldFetchHistory() && startDate) {
      fetchHistoryRequest(channel.slug, startDate);
    }
  }

  shouldFetchHistory() {
    const { messages, channel } = this.props;
    const firstMsgDate = messages[0] && messages[0].createdAt;

    return !isOnSameDay(firstMsgDate, channel.createdAt);
  }

  render() {
    const {
      isFetching,
      channel,
      messages,
      currentUserSlug,
      openModal,
      containerRef,
      scrollAtTop,
      scrollAtBottom,
      matchUrl,
      height,
    } = this.props;

    const classes = classNames('ChannelScrollBar', {
      'ChannelScrollBar--loading': isFetching,
      'ChannelScrollBar--no-history': !isFetching && !this.shouldFetchHistory(),
    });

    return (
      <div className={classes}>
        <ScrollBar
          containerRef={containerRef}
          scrollAtTop={scrollAtTop}
          scrollAtBottom={scrollAtBottom}
          style={{ height }}
        >
          <ChannelBlurb
            channel={channel}
            currentUserSlug={currentUserSlug}
            openModal={openModal}
            matchUrl={matchUrl}
          />
          <div className="ChannelScrollBar__loader">
            <span className="ChannelScrollBar__loader-txt">Loading...</span>
          </div>
          <MessagesListContainer
            role="listitem"
            messages={messages}
            isDm={channel.hasDm}
            isHighlightable
            isHoverable
          />
        </ScrollBar>
      </div>
    );
  }
}

export default withScrollManager('Channel')(ChannelScrollBar);
