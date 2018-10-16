import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { destroySuccess } from '../actions/uiActions';

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
    destroySuccess: () => dispatch(destroySuccess(payloadName)),
  });

  const WithForm = ({
    success,
    errors,
    destroySuccess: successDestroy,
    ...props
  }) => (
    <Form
      formFor={payloadName}
      success={success}
      errors={errors}
      destroySuccess={successDestroy}
      render={form => (
        <WrappedComponent
          form={form}
          {...props}
        />
      )}
    />
  );

  return connect(mapStateToProps, mapDispatchToProps)(WithForm);
};

export default withForm;
