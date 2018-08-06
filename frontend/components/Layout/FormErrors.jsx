import React from 'react';
import { connect } from 'react-redux';
import { camelize } from 'humps';
import { withRouter } from 'react-router-dom';
import './FormErrors.css';

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
    const nextState = {
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
    const { errors } = this.state;

    if (!errors.length) {
      return null;
    }

    return (
      <div className="errors errors__form">
        <ul>
          {errors.map(error => (
            <li key={camelize(error)}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(FormErrors));
