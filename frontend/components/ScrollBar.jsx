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
    this.handleIsAtTop = this.handleIsAtTop.bind(this);
  }

  componentDidMount() {
    const { channelScrollLoc } = this.props;

    const scroller = this.scroller.current;

    if (channelScrollLoc) {
      if (channelScrollLoc || channelScrollLoc === 0) {
        scroller._container.scrollTop = channelScrollLoc;
      } else {
        this.scrollToBottom();
      }
    }

    if (scroller && scroller._container.scrollTop === 0) {
      this.handleIsAtTop(scroller);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldAutoScroll, isLoading } = this.props;
    const { isAtBottom } = this.state;

    if (!shouldAutoScroll) {
      return;
    }

    if (isAtBottom || this.hasNewMessage(isAtBottom, prevProps.lastMessage)) {
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
    const { isAtBottom } = this.state;

    if (!isAtBottom) {
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
