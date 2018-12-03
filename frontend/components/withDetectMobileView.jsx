import React from 'react';

const withDetectMobileView = WrappedComponent => (
  class WithDetectMobileView extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isMobileSize: false };
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
      const { isMobileSize } = this.state;
      const { innerWidth } = window;
      const nextState = innerWidth <= 768;

      if (isMobileSize !== nextState) {
        this.setState({ isMobileSize: nextState });
      }
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
);

export default withDetectMobileView;
