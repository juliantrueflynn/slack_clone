import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  errors: ownProps.errors || state.errors[ownProps.entity] || []
});

class FormErrors extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="errors errors__form">
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`formError${i}`}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(FormErrors);