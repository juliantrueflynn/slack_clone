import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './ScrollBar.css';

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
    this.state = { isAtBottom: false, clientHeight: 0 };
    this.handleIsAtBottom = this.handleIsAtBottom.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { shouldMountAtBottom, channelScrollLoc } = this.props;

    if (!shouldMountAtBottom) {
      return;
    }

    const scroller = this.scroller.current;

    if (channelScrollLoc || channelScrollLoc === 0) {
      scroller._container.scrollTop = channelScrollLoc;
    } else {
      this.scrollToBottom();
    }

    if (scroller._container.scrollTop === 0) {
      this.handleIsAtTop(scroller);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldAutoScroll, isFetching } = this.props;
    const { isAtBottom } = this.state;

    if (shouldAutoScroll && (isAtBottom || this.hasNewMessage(isAtBottom, prevProps.lastMessage))) {
      this.scrollToBottom();
    }

    if (isFetching || prevProps.isFetching) {
      const scroller = this.scroller.current._container;
      const container = scroller.children[0];
      const { height } = container.getBoundingClientRect();

      if (isFetching && !prevProps.isFetching) {
        this.setClientHeight(height);
      }

      if (!isFetching && prevProps.isFetching) {
        const clientHeight = height - prevState.clientHeight;
        this.setClientHeight(clientHeight);
        scroller.scrollTop = clientHeight;
      }
    }
  }

  componentWillUnmount() {
    const { updateScrollTop } = this.props;

    if (updateScrollTop) {
      const scroller = this.scroller.current._container;
      updateScrollTop(scroller.scrollTop);
    }
  }

  setClientHeight(clientHeight) {
    this.setState({ clientHeight });
  }

  hasNewMessage(isAtBottom, prevLastMsg) {
    const { lastMessage, currentUserSlug } = this.props;
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
