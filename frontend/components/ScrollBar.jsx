import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './ScrollBar.css';

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
    this.state = { isAtBottom: false };
    this.handleIsAtBottom = this.handleIsAtBottom.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { shouldAutoScroll } = this.props;
    const { isAtBottom } = this.state;

    if (shouldAutoScroll && this.hasNewMessage(prevProps.lastMessage)) {
      this.scrollToBottom();
    }

    if (shouldAutoScroll && isAtBottom) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    const { updateScrollTop } = this.props;

    if (updateScrollTop) {
      const scroller = this.scroller.current._container;
      updateScrollTop(scroller.scrollTop);
    }
  }

  hasNewMessage(prevLastMsg) {
    const { lastMessage, currentUserSlug } = this.props;
    const { isAtBottom } = this.state;
    const hasNewMsg = lastMessage && prevLastMsg && prevLastMsg.id !== lastMessage.id;
    const lastMsgByCurrUser = prevLastMsg && currentUserSlug === prevLastMsg.authorSlug;

    return (hasNewMsg && lastMsgByCurrUser) || (isAtBottom && hasNewMsg);
  }

  handleIsAtTop(e) {
    const { atTopCallback } = this.props;

    if (atTopCallback) {
      atTopCallback(e);
    }
  }

  handleIsAtBottom() {
    const { shouldAutoScroll } = this.props;
    const { isAtBottom } = this.state;

    if (shouldAutoScroll && !isAtBottom) {
      this.setState({ isAtBottom: true });
    }
  }

  handleScroll(e) {
    const { isAtBottom } = this.state;

    if (isAtBottom) {
      this.setState({ isAtBottom: false });
    }

    if (e.scrollTop === 0) {
      this.handleIsAtTop(e);
    }
  }

  scrollToBottom() {
    const scroller = this.scroller.current;

    if (scroller && scroller._container) {
      const { scrollHeight, clientHeight } = scroller._container;
      scroller._container.scrollTop = scrollHeight - clientHeight;
    }
  }

  render() {
    const { children, shouldAutoScroll } = this.props;
    const psScrollOptions = { suppressScrollX: true };

    if (shouldAutoScroll) {
      return (
        <div className="ScrollBar">
          <PerfectScrollBar
            ref={this.scroller}
            onYReachEnd={this.handleIsAtBottom}
            onScrollY={this.handleScroll}
            option={psScrollOptions}
          >
            <div className="ScrollBar__container">{children}</div>
          </PerfectScrollBar>
        </div>
      );
    }

    return (
      <div className="ScrollBar">
        <PerfectScrollBar option={psScrollOptions}>
          <div className="ScrollBar__container">{children}</div>
        </PerfectScrollBar>
      </div>
    );
  }
}

export default ScrollBar;
