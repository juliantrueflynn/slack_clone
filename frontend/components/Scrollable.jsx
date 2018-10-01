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
    const { isAutoScroll } = this.props;
    const { isAtBottom } = this.state;
    const hasNewEntry = this.hasNewMessage(prevProps.messages);

    if (isAutoScroll && (isAtBottom || hasNewEntry)) {
      this.scrollToBottom();
    }
  }

  hasNewMessage(prevMessages) {
    const { isMessageThread, messages, currentUserId } = this.props;

    let hasLenUpdate = prevMessages && prevMessages.length;
    if (isMessageThread && hasLenUpdate) {
      hasLenUpdate = prevMessages.length > 1;
    }

    if (hasLenUpdate) {
      const messagesLen = messages.length - 1;
      const prevMessagesLen = prevMessages.length - 1;
      const lastEntry = messages[messages.length - 1];
      const isByCurrUser = lastEntry.authorId === currentUserId;
      const hasEntry = prevMessagesLen !== messagesLen;
      return isByCurrUser && hasEntry;
    }

    return false;
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
      <div className="Scrollable">
        <div ref={this.messagesList} className="Scrollable__body" onScroll={this.handleScroll}>
          {children}
        </div>
      </div>
    );
  }
}

export default Scrollable;
