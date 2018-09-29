import React from 'react';
import './Scrollable.css';

class Scrollable extends React.Component {
  constructor(props) {
    super(props);
    this.messagesList = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { isAtBottom: false };
  }

  componentDidMount() {
    const { isMessageThread, isAutoScroll } = this.props;

    if (!isMessageThread && isAutoScroll) {
      this.scrollToBottom();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isMessageThread,
      isAutoScroll,
      messagesLen,
      lastEntry,
      currentUserId,
    } = this.props;
    const { isAtBottom } = this.state;
    const isNewEntryByCurrUser = lastEntry && lastEntry.authorId === currentUserId;
    const hasNewEntry = prevProps.messagesLen && prevProps.messagesLen !== messagesLen;

    if (!isMessageThread && isAutoScroll) {
      if (isAtBottom || (isNewEntryByCurrUser && hasNewEntry)) {
        this.scrollToBottom();
      }
    }

    if (isMessageThread && isAutoScroll) {
      if (isAtBottom || (isNewEntryByCurrUser && hasNewEntry)) {
        this.scrollToBottom();
      }
    }
  }

  handleScroll() {
    const { isAutoScroll } = this.props;
    const { isAtBottom } = this.state;
    const listNode = this.messagesList.current;
    const { scrollHeight, clientHeight, scrollTop } = listNode;
    const isBottom = scrollHeight - scrollTop === clientHeight;

    if (isAutoScroll) {
      if (isBottom) {
        this.setState({ isAtBottom: true });
      }

      if (!isBottom && isAtBottom) {
        this.setState({ isAtBottom: false });
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

    return (
      <div ref={this.messagesList} className="Scrollable" onScroll={this.handleScroll}>
        {children}
      </div>
    );
  }
}

export default Scrollable;
