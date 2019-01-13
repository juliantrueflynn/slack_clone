import React from 'react';
import { connect } from 'react-redux';
import { getConvoLastEntry, getChatroomLastEntry } from '../reducers/selectors';

const withScrollManager = scrollBarFor => (WrappedComponent) => {
  const mapStateToProps = (state) => {
    const { currentUser } = state.session;

    let lastMessage;

    if (scrollBarFor === 'Message') {
      lastMessage = getConvoLastEntry(state);
    }

    if (scrollBarFor === 'Chatroom') {
      lastMessage = getChatroomLastEntry(state);
    }

    return { lastMessage, currentUserSlug: currentUser.slug };
  };

  class WithScrollManager extends React.Component {
    constructor(props) {
      super(props);
      this.containerRef = React.createRef();
      this.state = { isAtBottom: false, isAtTop: false };
      this.scrollToBottom = this.scrollToBottom.bind(this);
      this.scrollTo = this.scrollTo.bind(this);
      this.currentScrollTop = this.currentScrollTop.bind(this);
      this.handleIsAtTop = this.handleIsAtTop.bind(this);
      this.handleIsAtBottom = this.handleIsAtBottom.bind(this);
    }

    componentDidUpdate(prevProps) {
      const { isAtBottom } = this.state;

      if (prevProps.lastMessage && this.hasNewMessage(prevProps.lastMessage)) {
        this.scrollToBottom();
      }

      if (isAtBottom) {
        this.scrollToBottom();
      }
    }

    scrollTo(pos) {
      this.containerRef.current._container.scrollTop = pos;
    }

    currentScrollTop() {
      return this.containerRef.current._container.scrollTop;
    }

    scrollToBottom() {
      if (this.containerRef && this.containerRef.current) {
        const container = this.containerRef.current._container;
        container.scrollTop = container.scrollHeight;
        this.handleIsAtBottom(true);
      }
    }

    handleIsAtTop(nextState) {
      const { isAtTop } = this.state;

      if (isAtTop !== nextState) {
        this.setState({ isAtTop: nextState });
      }
    }

    handleIsAtBottom(nextState) {
      const { isAtBottom } = this.state;

      if (isAtBottom !== nextState) {
        this.setState({ isAtBottom: nextState });
      }
    }

    hasNewMessage(prevLastMsg) {
      const { lastMessage, currentUserSlug } = this.props;
      const { isAtBottom } = this.state;
      const hasNewMsg = lastMessage && lastMessage.slug !== prevLastMsg.slug;
      const isByCurrUser = lastMessage && lastMessage.authorSlug === currentUserSlug;

      if (hasNewMsg) {
        return isByCurrUser || isAtBottom;
      }

      return false;
    }

    render() {
      return (
        <WrappedComponent
          containerRef={this.containerRef}
          scrollToBottom={this.scrollToBottom}
          scrollTo={this.scrollTo}
          currentScrollTop={this.currentScrollTop}
          scrollAtTop={this.handleIsAtTop}
          scrollAtBottom={this.handleIsAtBottom}
          {...this.state}
          {...this.props}
        />
      );
    }
  }

  return connect(mapStateToProps)(WithScrollManager);
};

export default withScrollManager;
