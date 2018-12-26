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
    this.state = { scrollerHeight: 0 };
    this.container = this.scrollbar.current;
    this.handleFetchHistory = this.handleFetchHistory.bind(this);
  }

  componentDidMount() {
    const { channel: { scrollLoc } } = this.props;
    this.container = this.scrollbar.current.scroller.current._container;

    if (this.container) {
      let scrollTop;
      if (scrollLoc || scrollLoc === 0) {
        scrollTop = scrollLoc;
      } else {
        scrollTop = this.container.scrollHeight;
      }

      this.container.scrollTop = scrollTop;

      if (this.container.scrollTop === 0) {
        this.handleFetchHistory();
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching } = this.props;

    if (isFetching && !prevProps.isFetching) {
      this.updateScrollerHeight(this.container.scrollHeight);
    }

    if (!isFetching && prevProps.isFetching) {
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
    return !isOnSameDay(firstMsgDate, channel.createdAt);
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

    const lastMessage = messages[messages.length - 1];
    const style = { height };
    const classes = classNames('ChannelScrollBar', {
      'ChannelScrollBar--loading': isFetching,
      'ChannelScrollBar--no-history': !isFetching && !this.shouldFetchHistory(),
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

export default ChannelScrollBar;
