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
  }

  componentDidMount() {
    const {
      channel: { scrollLoc },
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
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isFetching,
      scrollRef,
      scrollTo,
      isAtTop,
    } = this.props;

    if (isFetching && !prevProps.isFetching) {
      this.updateScrollerHeight(scrollRef.current._container.scrollHeight);
    }

    if (!isFetching && prevProps.isFetching) {
      const height = scrollRef.current._container.scrollHeight - prevState.scrollerHeight;
      scrollTo(height);
    }

    if (isAtTop && !prevProps.isAtTop) {
      this.handleFetchHistory();
    }
  }

  componentWillUnmount() {
    const { updateScrollTop, currentScrollTop } = this.props;
    updateScrollTop(currentScrollTop());
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
      scrollRef,
      scrollAtTop,
      scrollAtBottom,
      matchUrl,
      height,
    } = this.props;

    const style = { height };
    const classes = classNames('ChannelScrollBar', {
      'ChannelScrollBar--loading': isFetching,
      'ChannelScrollBar--no-history': !isFetching && !this.shouldFetchHistory(),
    });

    return (
      <div className={classes} style={style}>
        <ScrollBar scrollRef={scrollRef} scrollAtTop={scrollAtTop} scrollAtBottom={scrollAtBottom}>
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
