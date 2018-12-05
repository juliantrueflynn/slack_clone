import React from 'react';

const withWindowResize = WrappedComponent => (
  class WithDetectMobileView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isMobileSize: false,
        windowHeight: 0,
        windowWidth: 0,
      };
      this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
      const isMobileSize = windowWidth <= 768;

      this.setState({ isMobileSize, windowWidth, windowHeight });
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
);

export default withWindowResize;
