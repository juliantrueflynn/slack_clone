import React from 'react';
import { connect } from 'react-redux';
import { getConvoLastEntry, getChannelLastEntry } from '../reducers/selectors';

const withScrollManager = scrollBarFor => (WrappedComponent) => {
  const mapStateToProps = (state) => {
    const { currentUser } = state.session;

    let lastMessage;

    if (scrollBarFor === 'Message') {
      lastMessage = getConvoLastEntry(state);
    }

    if (scrollBarFor === 'Channel') {
      lastMessage = getChannelLastEntry(state);
    }

    return { lastMessage, currentUserSlug: currentUser.slug };
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
      const { lastMessage, currentUserSlug } = this.props;
      const { isAtBottom } = this.state;
      const hasNewMsg = prevLastMsg.slug !== lastMessage.slug;
      const isByCurrUser = lastMessage.authorSlug === currentUserSlug;

      if (hasNewMsg) {
        return isByCurrUser || isAtBottom;
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
