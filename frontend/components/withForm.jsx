import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';

const withForm = ({ type, payloadName }) => (WrappedComponent) => {
  const mapStateToProps = state => ({
    success: state.success[payloadName],
    errors: state.errors[payloadName],
  });

  const mapDispatchToProps = dispatch => ({
    formDispatchRequest: (entity) => {
      if (!type || !payloadName) {
        return null;
      }

      const payload = { type, [payloadName]: entity };

      return dispatch(payload);
    },
  });

  const WithForm = ({ success, errors, ...rest }) => (
    <Form
      formFor={payloadName}
      success={success}
      errors={errors}
      render={form => <WrappedComponent form={form} {...rest} />}
    />
  );

  const wrappedComponentName = WrappedComponent.displayName
  || WrappedComponent.name
  || 'Component';

  WithForm.displayName = `withForm(${wrappedComponentName})`;

  return connect(mapStateToProps, mapDispatchToProps)(WithForm);
};

export default withForm;
