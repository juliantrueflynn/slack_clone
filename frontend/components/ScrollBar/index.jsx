import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles.css';

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsAtTop = this.handleIsAtTop.bind(this);
    this.handleIsAtBottom = this.handleIsAtBottom.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleIsAtTop() {
    const { scrollAtTop } = this.props;

    if (scrollAtTop) {
      scrollAtTop(true);
    }
  }

  handleIsAtBottom() {
    const { scrollAtBottom } = this.props;

    if (scrollAtBottom) {
      scrollAtBottom(true);
    }
  }

  handleScroll() {
    const { scrollAtBottom, scrollAtTop } = this.props;

    if (scrollAtBottom) {
      scrollAtBottom(false);
    }

    if (scrollAtTop) {
      scrollAtTop(false);
    }
  }

  render() {
    const {
      scrollBarRef,
      containerRef,
      scrollAtTop,
      scrollAtBottom,
      style,
      children,
      ...props
    } = this.props;
    const psOptions = { suppressScrollX: true };

    return (
      <div className="ScrollBar" ref={scrollBarRef} style={style}>
        <PerfectScrollBar
          ref={containerRef}
          onYReachStart={this.handleIsAtTop}
          onYReachEnd={this.handleIsAtBottom}
          onScrollY={this.handleScroll}
          option={psOptions}
          {...props}
        >
          <div className="ScrollBar__container">{children}</div>
        </PerfectScrollBar>
      </div>
    );
  }
}

export default ScrollBar;
