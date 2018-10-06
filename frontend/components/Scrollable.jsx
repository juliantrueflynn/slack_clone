import React from 'react';
import { withRouter } from 'react-router-dom';
import { isDateOlderThanOther } from '../util/dateUtil';
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
      hasHistory: false,
    };
  }

  componentDidMount() {
    const {
      isMessageThread,
      isAutoScroll,
      fetchHistoryRequest,
      messages,
      channel,
    } = this.props;

    if (!isMessageThread && isAutoScroll) {
      this.scrollToBottom();
    }

    if (fetchHistoryRequest) {
      const parents = messages.filter(msg => !msg.parentMessageId);
      const hasAllMessagesAlready = parents.length > 12;
      this.setState({ hasHistory: hasAllMessagesAlready });
    }

    if (channel && channel.scrollLoc) {
      const listNode = this.messagesList.current;
      listNode.scrollTop = channel.scrollLoc;
    }
  }

  componentDidUpdate(prevProps) {
    const { messages, isAutoScroll } = this.props;
    const { isAtBottom, isAtTop, isLoadingHistory } = this.state;

    if (!isAutoScroll || !messages.length) {
      return;
    }

    if (isLoadingHistory && messages.length > prevProps.messages.length) {
      this.setStateIfChanged('isLoadingHistory', false);
    }

    if (isAtTop) {
      this.setLastFetched();
    }

    if (isAtBottom || this.hasNewMessage(prevProps.messages)) {
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
    const { messages, currentUserId } = this.props;
    const lastEntry = messages[messages.length - 1];
    const prevLastEntry = prevMessages[prevMessages.length - 1];
    const isNewEntryByCurrUser = lastEntry && lastEntry.authorId === currentUserId;
    const hasNewEntry = prevLastEntry && prevLastEntry.id !== lastEntry.id;

    return isNewEntryByCurrUser && hasNewEntry;
  }

  handleScroll() {
    const { updateScrollLoc, isAutoScroll, fetchHistoryRequest } = this.props;
    const listNode = this.messagesList.current;
    const { scrollHeight, clientHeight, scrollTop } = listNode;

    if (updateScrollLoc) {
      updateScrollLoc(scrollTop);
    }

    if (isAutoScroll) {
      const isAtBottom = scrollHeight - scrollTop === clientHeight;
      this.setStateIfChanged('isAtBottom', isAtBottom);

      if (fetchHistoryRequest) {
        const isAtTop = scrollTop < 300;
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

export default withRouter(Scrollable);
