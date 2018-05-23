import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
  errors: ownProps.errors || state.errors[ownProps.entity] || []
});

class FormErrors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      pathname: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let nextState = {
      errors: [],
      pathname: nextProps.location.pathname
    };

    if (nextProps.errors !== prevState.errors) {
      nextState.errors = nextProps.errors;
    }

    if (nextProps.location.pathname !== prevState.pathname) {
      nextState.errors = [];
    }
    
    return nextState;
  }

  render() {
    return (
      <div className="errors errors__form">
        <ul>
          {this.state.errors.map((error, i) => (
            <li key={`formError${i}`}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(FormErrors));