import React from 'react';
import './Scrollable.css';

class Scrollable extends React.Component {
  constructor(props) {
    super(props);
    this.messagesList = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isAtTop: false,
      isAtBottom: false,
      isLoadingHistory: false,
      lastFetchedDate: null,
      hasHistory: false,
    };
  }

  componentDidMount() {
    const {
      isMessageThread,
      isAutoScroll,
      fetchHistoryRequest,
      messages,
    } = this.props;

    if (!isMessageThread && isAutoScroll) {
      this.scrollToBottom();
    }

    if (fetchHistoryRequest) {
      const parents = messages.filter(msg => !msg.parentMessageId);
      const hasAllMessagesAlready = parents.length > 12;
      this.setState({ hasHistory: hasAllMessagesAlready });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages, isAutoScroll } = this.props;
    const { isAtBottom, lastFetchedDate, isAtTop } = this.state;

    if (!isAutoScroll) {
      return;
    }

    const firstMessageDate = messages[0] && messages[0].createdAt;
    const isLoadingHistory = prevState.lastFetchedDate && lastFetchedDate !== firstMessageDate;

    this.setLoadingHistory(isLoadingHistory);

    if (isAtTop) {
      this.setLastFetched(firstMessageDate);
    }

    if (isAtBottom || this.hasNewMessage(prevProps.messages)) {
      this.scrollToBottom();
    }
  }

  setLastFetched(fetchedDate) {
    const { fetchHistoryRequest } = this.props;
    const { hasHistory, lastFetchedDate } = this.state;

    if (fetchHistoryRequest && hasHistory && lastFetchedDate === fetchedDate) {
      this.setState({ hasHistory: false });
    }

    if (fetchHistoryRequest && lastFetchedDate !== fetchedDate) {
      this.setState({ lastFetchedDate: fetchedDate });

      if (hasHistory) {
        fetchHistoryRequest(fetchedDate);
      }
    }
  }

  setLoadingHistory(loadingHistory) {
    const { isLoadingHistory } = this.state;

    if (isLoadingHistory !== loadingHistory) {
      this.setState({ isLoadingHistory: loadingHistory });
    }
  }

  setAtBottom(scrollLoc) {
    const { isAtBottom } = this.state;

    if (isAtBottom !== scrollLoc) {
      this.setState({ isAtBottom: scrollLoc });
    }
  }

  setAtTop(scrollLoc) {
    const { isAtTop } = this.state;

    if (isAtTop !== scrollLoc) {
      this.setState({ isAtTop: scrollLoc });
    }
  }

  hasNewMessage(prevMessages) {
    const { messages, currentUserId, hasLoaded } = this.props;

    if (hasLoaded && messages.length) {
      const lastEntry = messages[messages.length - 1];
      const prevLastEntry = prevMessages[prevMessages.length - 1];
      const isNewEntryByCurrUser = lastEntry.authorId === currentUserId;
      const hasNewEntry = lastEntry.id !== prevLastEntry.id;
      return isNewEntryByCurrUser && hasNewEntry;
    }

    return false;
  }

  handleScroll() {
    const { isAutoScroll, fetchHistoryRequest, hasLoaded } = this.props;
    const listNode = this.messagesList.current;
    const { scrollHeight, clientHeight, scrollTop } = listNode;

    if (isAutoScroll) {
      const isAtBottom = scrollHeight - scrollTop === clientHeight;
      this.setAtBottom(isAtBottom);

      if (hasLoaded && fetchHistoryRequest) {
        const isAtTop = scrollTop < 220;
        this.setAtTop(isAtTop);
      }
    }
  }

  scrollToBottom() {
    const listNode = this.messagesList.current;
    const { scrollHeight, clientHeight } = listNode;
    const maxScrollTop = scrollHeight - clientHeight;
    listNode.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { children } = this.props;
    const { isLoadingHistory, hasHistory } = this.state;

    let classNames = 'Scrollable';
    if (isLoadingHistory) classNames += ' Scrollable--fetching';
    classNames += hasHistory ? ' Scrollable--has-history' : ' Scrollable--done';

    return (
      <div className={classNames}>
        <div ref={this.messagesList} className="Scrollable__body" onScroll={this.handleScroll}>
          {children}
        </div>
      </div>
    );
  }
}

export default Scrollable;
