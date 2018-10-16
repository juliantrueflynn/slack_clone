import React from 'react';
import { connect } from 'react-redux';

const withForm = ({ type, payloadName }) => (WrappedComponent) => {
  const mapStateToProps = state => ({
    success: state.success[payloadName],
    errors: state.errors[payloadName],
  });

  const mapDispatchToProps = dispatch => ({
    formDispatchRequest: (entity) => {
      const payload = { type, [payloadName]: entity };
      return dispatch(payload);
    },
  });

  const WithForm = props => (
    <WrappedComponent {...props} />
  );

  return connect(mapStateToProps, mapDispatchToProps)(WithForm);
};

export default withForm;
