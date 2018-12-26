import React from 'react';
import classNames from 'classnames';
import { isOnSameDay } from '../util/dateUtil';
import ScrollBar from './ScrollBar';
import ChannelBlurb from './ChannelBlurb';
import MessagesListContainer from './MessagesListContainer';
import './ChannelScrollBar.css';

class ChannelScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scrollbar = React.createRef();
    this.state = { hasHistory: true, scrollerHeight: 0 };
    this.handleFetchHistory = this.handleFetchHistory.bind(this);
    this.container = this.scrollbar.current;
  }

  componentDidMount() {
    this.handleHistory();
    this.container = this.scrollbar.current.scroller.current._container;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching } = this.props;

    if (isFetching && !prevProps.isFetching) {
      this.updateScrollerHeight(this.container.scrollHeight);
    }

    if (!isFetching && prevProps.isFetching) {
      this.handleHistory();
      const height = this.container.scrollHeight - prevState.scrollerHeight;
      this.container.scrollTop = height;
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
    const parents = messages.filter(msg => !msg.parentMessageId || msg.entityType === 'entry');

    if (!messages[0] || parents.length < 13) {
      return false;
    }

    return !isOnSameDay(firstMsgDate, channel.createdAt);
  }

  handleHistory() {
    this.setState({ hasHistory: this.shouldFetchHistory() });
  }

  render() {
    const {
      isFetching,
      channel,
      messages,
      updateScrollTop,
      currentUserSlug,
      openModal,
      matchUrl,
      height,
    } = this.props;
    const { hasHistory } = this.state;

    const lastMessage = messages[messages.length - 1];
    const style = { height };
    const classes = classNames('ChannelScrollBar', {
      'ChannelScrollBar--loading': isFetching,
      'ChannelScrollBar--no-history': !isFetching && !hasHistory,
    });

    return (
      <div className={classes} style={style}>
        <ScrollBar
          ref={this.scrollbar}
          channelScrollLoc={channel.scrollLoc}
          currentUserSlug={currentUserSlug}
          lastMessage={lastMessage}
          atTopCallback={this.handleFetchHistory}
          updateScrollTop={updateScrollTop}
          shouldAutoScroll
          shouldMountAtBottom
        >
          {!isFetching && !hasHistory && (
            <ChannelBlurb
              channel={channel}
              currentUserSlug={currentUserSlug}
              openModal={openModal}
              matchUrl={matchUrl}
            />
          )}
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

export default ChannelScrollBar;
