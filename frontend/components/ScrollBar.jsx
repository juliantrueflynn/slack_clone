import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { isDateOlderThanOther } from '../util/dateUtil';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './ScrollBar.css';

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
    this.state = { isAtBottom: false, hasHistory: true };
    this.handleIsAtTop = this.handleIsAtTop.bind(this);
    this.handleIsAtBottom = this.handleIsAtBottom.bind(this);
    this.handleScrollUp = this.handleScrollUp.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { fetchHistory, messages, channel } = this.props;
    const scrollNode = this.scroller.current;

    if (channel) {
      if (channel.scrollLoc || channel.scrollLoc === 0) {
        scrollNode._container.scrollTop = channel.scrollLoc;
        this.setState({ hasHistory: false });
      } else {
        this.scrollToBottom();
      }
    }

    if (scrollNode && scrollNode._container.scrollTop === 0) {
      this.setState({ hasHistory: false });
    }

    if (fetchHistory) {
      const parents = messages.filter(msg => !msg.parentMessageId);
      const hasAllMessagesAlready = parents.length > 12;
      this.setState({ hasHistory: hasAllMessagesAlready });
    }
  }

  componentDidUpdate(prevProps) {
    const { shouldAutoScroll } = this.props;
    const { isAtBottom } = this.state;

    if (shouldAutoScroll) {
      if (isAtBottom && prevProps.messages && this.hasNewMessage(prevProps.messages)) {
        this.scrollToBottom();
      }
    }
  }

  static getFirstMessageDate(messages) {
    const chatEntries = messages.filter(entry => !entry.isInConvo);
    return chatEntries[0] ? chatEntries[0].createdAt : null;
  }

  hasNewMessage(prevMessages) {
    const { messages } = this.props;
    const lastEntry = messages[messages.length - 1];
    const prevLastEntry = prevMessages[prevMessages.length - 1];

    if (!lastEntry || !prevLastEntry) {
      return false;
    }

    return lastEntry.isCurrentUser && prevLastEntry.id !== lastEntry.id;
  }

  handleIsAtTop() {
    const {
      fetchHistory,
      isLoadingHistory,
      channel,
      messages,
    } = this.props;
    const { hasHistory } = this.state;

    if (hasHistory && fetchHistory && !isLoadingHistory && this.hasOldFetchedDate()) {
      const startDate = ScrollBar.getFirstMessageDate(messages);
      fetchHistory(channel.slug, startDate);
    }
  }

  handleIsAtBottom() {
    const { shouldAutoScroll } = this.props;
    const { isAtBottom } = this.state;

    if (shouldAutoScroll && !isAtBottom) {
      this.setState({ isAtBottom: true });
    }
  }

  handleScrollUp() {
    const { isAtBottom } = this.state;

    if (isAtBottom) {
      this.setState({ isAtBottom: false });
    }
  }

  handleScroll(e) {
    const { updateScrollLoc } = this.props;
    const { isAtBottom } = this.props;

    if (updateScrollLoc && !isAtBottom) {
      updateScrollLoc(e.scrollTop);
    }
  }

  hasOldFetchedDate() {
    const { channel, messages } = this.props;
    const messageCreatedAt = ScrollBar.getFirstMessageDate(messages);
    return isDateOlderThanOther(channel.lastFetched, messageCreatedAt);
  }

  scrollToBottom() {
    const scroller = this.scroller.current;

    if (scroller && scroller._container) {
      const { scrollHeight, clientHeight } = scroller._container;
      const maxScrollTop = scrollHeight - clientHeight;
      scroller._container.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  render() {
    const { children, shouldAutoScroll } = this.props;
    const childrenContainer = (
      <div className="ScrollBar__container">
        {children}
      </div>
    );

    if (shouldAutoScroll) {
      return (
        <div className="ScrollBar">
          <PerfectScrollBar
            ref={this.scroller}
            onScrollUp={this.handleScrollUp}
            onYReachStart={this.handleIsAtTop}
            onYReachEnd={this.handleIsAtBottom}
            onScrollY={this.handleScroll}
          >
            {childrenContainer}
          </PerfectScrollBar>
        </div>
      );
    }

    return (
      <div className="ScrollBar">
        <PerfectScrollBar>
          {childrenContainer}
        </PerfectScrollBar>
      </div>
    );
  }
}

export default ScrollBar;
