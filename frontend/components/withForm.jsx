import React from 'react';
import { connect } from 'react-redux';

const withForm = ({ action, name, mapStateToProps }) => (WrappedComponent) => {
  const mapDispatchToProps = dispatch => ({
    formDispatchRequest: (entity) => {
      const type = `${name}_${action}_REQUEST`;
      const entityName = name.toLowerCase();
      const payload = { type, [entityName]: entity };
      return dispatch(payload);
    }
  });

  const WithForm = props => (
    <WrappedComponent {...props} />
  );

  return connect(mapStateToProps, mapDispatchToProps)(WithForm);
};

export default withForm;
