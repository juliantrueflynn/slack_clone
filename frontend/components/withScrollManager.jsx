import React from 'react';
import { connect } from 'react-redux';

const withScrollManager = scrollBarFor => (WrappedComponent) => {
  const mapStateToProps = (state) => {
    const msgsMap = state.entities.messages;
    const { currentUser } = state.session;

    let lastMessage;

    if (scrollBarFor === 'Channel') {
      const channelsMap = state.entities.channels;
      const chatPath = state.ui.displayChatPath;
      const msgs = channelsMap[chatPath].messages;
      const lastEntrySlug = msgs[msgs.length - 1];
      lastMessage = msgsMap[lastEntrySlug];
    }

    if (scrollBarFor === 'Message') {
      const { drawerSlug } = state.ui.drawer;
      const msgs = msgsMap[drawerSlug] && msgsMap[drawerSlug].thread;
      const lastThreadSlug = msgs && msgs[msgs.length - 1];
      lastMessage = msgsMap[lastThreadSlug];
    }

    if (lastMessage) {
      lastMessage.isByCurrentUser = lastMessage.authorSlug === currentUser.slug;
    }

    return { lastMessage };
  };

  class WithScrollManager extends React.Component {
    constructor(props) {
      super(props);
      this.scroll = React.createRef();
      this.state = { isAtBottom: false };
      this.scrollToBottom = this.scrollToBottom.bind(this);
      this.scrollTo = this.scrollTo.bind(this);
      this.currentScrollTop = this.currentScrollTop.bind(this);
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
      this.scroll.current._container.scrollTop = pos;
    }

    currentScrollTop() {
      return this.scroll.current._container.scrollTop;
    }

    scrollToBottom() {
      if (this.scroll && this.scroll.current) {
        const container = this.scroll.current._container;
        container.scrollTop = container.scrollHeight;
        this.handleIsAtBottom(true);
      }
    }

    handleIsAtBottom(nextState) {
      const { isAtBottom } = this.state;

      if (isAtBottom !== nextState) {
        this.setState({ isAtBottom: nextState });
      }
    }

    hasNewMessage(prevLastMsg) {
      const { lastMessage } = this.props;
      const { isAtBottom } = this.state;
      const hasNewMsg = prevLastMsg.slug !== lastMessage.slug;

      if (hasNewMsg) {
        return lastMessage.isByCurrentUser || isAtBottom;
      }

      return false;
    }

    render() {
      return (
        <WrappedComponent
          scrollRef={this.scroll}
          scrollToBottom={this.scrollToBottom}
          scrollTo={this.scrollTo}
          currentScrollTop={this.currentScrollTop}
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
