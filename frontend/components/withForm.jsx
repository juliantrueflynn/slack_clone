import React from 'react';
import { connect } from 'react-redux';

const withForm = ({ formFor, mapStateToProps }) => (WrappedComponent) => {
  const mapDispatchToProps = dispatch => ({
    createEntityRequest: (entity) => {
      const type = `${formFor.toUpperCase()}_CREATE_REQUEST`;
      const payload = { type };
      payload[formFor] = entity;

      return dispatch(payload);
    }
  });

  const WithForm = props => (
    <WrappedComponent {...props} />
  );

  return connect(mapStateToProps, mapDispatchToProps)(WithForm);
};

export default withForm;
