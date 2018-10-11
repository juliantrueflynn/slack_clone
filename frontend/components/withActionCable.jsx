import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { camelizeKeys } from 'humps';

const mapStateToProps = state => ({ isLoggedIn: !!state.session.currentUser });

const mapDispatchToProps = dispatch => ({ actionCableReceive: received => dispatch(received) });

const withActionCable = (WrappedComponent) => {
  class WithActionCable extends React.Component {
    constructor(props) {
      super(props);
      this.handleReceived = this.handleReceived.bind(this);
    }

    handleReceived(received) {
      const { actionCableReceive } = this.props;
      const payload = camelizeKeys(received);
      actionCableReceive(payload);
    }

    render() {
      return <WrappedComponent {...this.props} onReceived={this.handleReceived} />;
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithActionCable));
};

export default withActionCable;
