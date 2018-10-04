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

    if (!isAutoScroll || !messages.length) {
      return;
    }

    const firstMessageDate = messages[0] && messages[0].createdAt;
    const isLoadingHistory = prevState.lastFetchedDate && lastFetchedDate !== firstMessageDate;

    this.setStateIfChanged('isLoadingHistory', isLoadingHistory);

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

  setStateIfChanged(propName, value) {
    const { ...state } = this.state;

    if (state[propName] !== value) {
      this.setState({ [propName]: value });
    }
  }

  hasNewMessage(prevMessages) {
    const { messages, currentUserId } = this.props;
    const lastEntry = messages[messages.length - 1];
    const prevLastEntry = prevMessages[prevMessages.length - 1];
    const isNewEntryByCurrUser = lastEntry && lastEntry.authorId === currentUserId;
    const hasNewEntry = prevLastEntry && prevLastEntry.id !== lastEntry.id;

    return isNewEntryByCurrUser && hasNewEntry;
  }

  handleScroll() {
    const { isAutoScroll, fetchHistoryRequest } = this.props;
    const listNode = this.messagesList.current;
    const { scrollHeight, clientHeight, scrollTop } = listNode;

    if (isAutoScroll) {
      const isAtBottom = scrollHeight - scrollTop === clientHeight;
      this.setStateIfChanged('isAtBottom', isAtBottom);

      if (fetchHistoryRequest) {
        const isAtTop = scrollTop < 220;
        this.setStateIfChanged('isAtTop', isAtTop);
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
    const { hasHistory } = this.state;

    let classNames = 'Scrollable';
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
