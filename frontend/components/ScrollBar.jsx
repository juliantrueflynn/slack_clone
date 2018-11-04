import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './ScrollBar.css';

class ScrollBar extends React.Component {
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="ScrollBar">
        <PerfectScrollBar component="div">
          <div className="ScrollBar__container">
            {children}
          </div>
        </PerfectScrollBar>
      </div>
    );
  }
}

export default ScrollBar;
