import React from 'react';
import { withRouter } from 'react-router-dom';
import { isDateOlderThanOther } from '../util/dateUtil';
import './Scrollable.css';

class Scrollable extends React.Component {
  constructor(props) {
    super(props);
    this.list = React.createRef();
    this.scroller = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.state = {
      isAtTop: false,
      isAtBottom: false,
      isLoadingHistory: false,
      hasHistory: false,
      isDragging: false,
      lastClientPosition: -1,
    };
  }

  componentDidMount() {
    const {
      shouldMountAtBottom,
      isAutoScroll,
      fetchHistoryRequest,
      messages,
      channel,
    } = this.props;

    if (channel && (channel.scrollLoc || channel.scrollLoc === 0)) {
      const listNode = this.list.current;
      listNode.scrollTop = channel.scrollLoc;
      this.setState({ hasHistory: false });
    } else if (shouldMountAtBottom && isAutoScroll) {
      this.scrollToBottom();
    }

    if (fetchHistoryRequest) {
      const parents = messages.filter(msg => !msg.parentMessageId);
      const hasAllMessagesAlready = parents.length > 12;
      this.setState({ hasHistory: hasAllMessagesAlready });

      if (channel && (channel.scrollLoc || channel.scrollLoc === 0)) {
        this.setState({ hasHistory: false });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { messages, isAutoScroll } = this.props;
    const { isAtBottom, isAtTop, isLoadingHistory } = this.state;

    if (!isAutoScroll || !messages || !messages.length) {
      return;
    }

    if (isLoadingHistory && messages.length > prevProps.messages.length) {
      this.setStateIfChanged('isLoadingHistory', false);
    }

    if (isAtTop) {
      this.setLastFetched();
    }

    if (isAtBottom || (prevProps.messages && this.hasNewMessage(prevProps.messages))) {
      this.scrollToBottom();
    }
  }

  setLastFetched() {
    const { fetchHistoryRequest, messages, channel } = this.props;
    const { hasHistory, isLoadingHistory } = this.state;

    if (fetchHistoryRequest && hasHistory && !this.hasOldFetchedDate()) {
      this.setState({ hasHistory: false });
    }

    if (hasHistory && fetchHistoryRequest && this.hasOldFetchedDate() && !isLoadingHistory) {
      const startDate = Scrollable.getFirstMessageDate(messages);
      this.setState({ isLoadingHistory: true });
      fetchHistoryRequest(channel.slug, startDate);
    }
  }

  setStateIfChanged(propName, value) {
    const { ...state } = this.state;

    if (state[propName] !== value) {
      this.setState({ [propName]: value });
    }
  }

  static getFirstMessageDate(messages) {
    const chatEntries = messages.filter(entry => !entry.isInConvo);
    return chatEntries[0] ? chatEntries[0].createdAt : null;
  }

  hasOldFetchedDate() {
    const { channel, messages } = this.props;
    const messageCreatedAt = Scrollable.getFirstMessageDate(messages);
    return isDateOlderThanOther(channel.lastFetched, messageCreatedAt);
  }

  hasNewMessage(prevMessages) {
    const { messages } = this.props;
    const lastEntry = messages[messages.length - 1];
    const prevLastEntry = prevMessages[prevMessages.length - 1];
    const isByCurrUser = lastEntry && lastEntry.isCurrentUser;
    const hasNewEntry = prevLastEntry && prevLastEntry.id !== lastEntry.id;

    return isByCurrUser && hasNewEntry;
  }

  handleScroll() {
    const { updateScrollLoc, isAutoScroll, fetchHistoryRequest } = this.props;
    const listNode = this.list.current;
    const { scrollHeight, clientHeight, scrollTop } = listNode;

    if (updateScrollLoc) {
      updateScrollLoc(scrollTop);
    }

    if (isAutoScroll) {
      const isAtBottom = scrollHeight - scrollTop === clientHeight;
      this.setStateIfChanged('isAtBottom', isAtBottom);

      if (fetchHistoryRequest) {
        const isAtTop = scrollTop < 250;
        this.setStateIfChanged('isAtTop', isAtTop);
      }
    }
  }

  handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    let lastClientPosition = e.clientY;
    this.setState({ isDragging: true, lastClientPosition });
  }

  scrollToBottom() {
    const listNode = this.list.current;
    const { scrollHeight, clientHeight } = listNode;
    const maxScrollTop = scrollHeight - clientHeight;
    listNode.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { children } = this.props;

    const list = this.list.current;
    let style = {};
    if (list) {
      style = { transform: `translateY(${list.scrollTop}px)` };
    }

    return (
      <div className="Scrollable">
        <div ref={this.list} role="presentation" className="Scrollable__body" onScroll={this.handleScroll}>
          {children}
        </div>
        <div className="scrollbar-container">
          <div className="scrollbar" ref={this.scroller} onMouseDown={this.handleMouseDown} style={style} />
        </div>
      </div>
    );
  }
}

export default withRouter(Scrollable);
