import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
    this.state = { isAtBottom: false, clientHeight: 0 };
    this.handleIsAtBottom = this.handleIsAtBottom.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { fetchHistory, channelScrollLoc } = this.props;

    if (!fetchHistory) {
      return;
    }

    const scroller = this.scroller.current._container;

    if (channelScrollLoc || channelScrollLoc === 0) {
      scroller.scrollTop = channelScrollLoc;
    } else {
      this.scrollToBottom();
    }

    if (scroller.scrollTop === 0) {
      fetchHistory();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldAutoScroll, isLoading } = this.props;
    const { isAtBottom } = this.state;

    if (shouldAutoScroll && (isAtBottom || this.hasNewMessage(isAtBottom, prevProps.lastMessage))) {
      this.scrollToBottom();
    }

    if (isLoading || prevProps.isLoading) {
      const scroller = this.scroller.current._container;
      const container = scroller.children[0];
      const { height } = container.getBoundingClientRect();

      if (isLoading && !prevProps.isLoading) {
        this.setClientHeight(height);
      }

      if (!isLoading && prevProps.isLoading) {
        const clientHeight = height - prevState.clientHeight;
        this.setClientHeight(clientHeight);
        scroller.scrollTop = clientHeight;
      }
    }
  }

  setClientHeight(clientHeight) {
    this.setState({ clientHeight });
  }

  hasNewMessage(isAtBottom, prevLastMsg) {
    const { lastMessage, currentUserSlug } = this.props;
    const hasNewMsg = lastMessage && prevLastMsg && prevLastMsg.id !== lastMessage.id;

    if (hasNewMsg && currentUserSlug === prevLastMsg.authorSlug) {
      return true;
    }

    return isAtBottom && hasNewMsg;
  }

  handleIsAtBottom() {
    const { isAtBottom } = this.state;

    if (!isAtBottom) {
      this.setState({ isAtBottom: true });
    }
  }

  handleScroll(e) {
    const { updateScrollLoc, fetchHistory } = this.props;
    const { isAtBottom } = this.state;

    if (isAtBottom) {
      this.setState({ isAtBottom: false });
    }

    if (fetchHistory && e.scrollTop === 0) {
      fetchHistory(e.scrollTop);
    }

    if (updateScrollLoc) {
      updateScrollLoc(e.scrollTop);
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

    const style = {
      position: 'relative',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    };

    if (shouldAutoScroll) {
      return (
        <div className="ScrollBar" style={style}>
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
      <div className="ScrollBar" style={style}>
        <PerfectScrollBar option={psScrollOptions}>
          <div className="ScrollBar__container">{children}</div>
        </PerfectScrollBar>
      </div>
    );
  }
}

export default ScrollBar;
