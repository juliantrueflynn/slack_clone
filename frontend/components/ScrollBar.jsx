import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './ScrollBar.css';

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsAtBottom = this.handleIsAtBottom.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillUnmount() {
    const { updateScrollTop, scrollRef } = this.props;

    if (updateScrollTop) {
      const scroller = scrollRef.current._container;
      updateScrollTop(scroller.scrollTop);
    }
  }

  handleIsAtTop(e) {
    const { atTopCallback } = this.props;

    if (atTopCallback) {
      atTopCallback(e);
    }
  }

  handleIsAtBottom() {
    const { scrollAtBottom } = this.props;

    if (scrollAtBottom) {
      scrollAtBottom(true);
    }
  }

  handleScroll(e) {
    const { scrollAtBottom } = this.props;

    if (scrollAtBottom) {
      scrollAtBottom(false);
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
    const { children, scrollRef } = this.props;
    const psOptions = { suppressScrollX: true };

    return (
      <div className="ScrollBar">
        <PerfectScrollBar
          ref={scrollRef}
          onYReachEnd={this.handleIsAtBottom}
          onScrollY={this.handleScroll}
          option={psOptions}
        >
          <div className="ScrollBar__container">{children}</div>
        </PerfectScrollBar>
      </div>
    );
  }
}

export default ScrollBar;
